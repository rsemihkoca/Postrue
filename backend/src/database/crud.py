from .db import SessionLocal, engine, Base
from .models import Transactions
from . import models
import time
from functools import wraps
from datetime import datetime, timedelta, date
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, Boolean, DateTime, func, case, and_

def insertTransaction(transaction:dict):

    with SessionLocal() as session:

        try:

            NewTransaction = Transactions(**transaction)
            session.add(NewTransaction)
            session.commit()
            session.refresh(NewTransaction)

            return NewTransaction
        except Exception as e:
            print(e)
            return None
def profiler(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} executed in {end_time - start_time:.2f} seconds")
        return result
    return wrapper
@profiler
def get_sum(table, columns: list[str], start_date: datetime, end_date: datetime) -> dict:
    with SessionLocal() as session:
        try:
            # Dynamically build the aggregation part of the query
            aggregation_functions = [func.sum(getattr(table, col)).label(col) for col in columns]

            results = session.query(*aggregation_functions).filter(
                table.Date >= start_date,
                table.Date <= end_date
            ).one()  # Using one() to retrieve a single result directly

            # Map results to column names
            return {column: getattr(results, column) for column in columns}

        except Exception as e:
            raise e


def good_percentage_for_date_range(start_date, end_date):
    with SessionLocal() as session:
        try:

            total_count = session.query(func.count(Transactions.Id)).filter(
                Transactions.Datetime.between(start_date, end_date)
            ).scalar()

            good_postures_count = session.query(func.count(Transactions.Id)).filter(
                Transactions.Datetime.between(start_date, end_date),
                Transactions.Result == 'Good'
            ).scalar()

            return (good_postures_count / total_count) if total_count else 0, total_count
        except Exception as e:
            raise e

def calculate_data_for_today():
    start_date = date.today()
    end_date = datetime.now()
    # Calculate good_posture_percentage for today
    today_good_percentage, total_count = good_percentage_for_date_range(start_date, end_date)

    # Calculate good_posture_percentage for yesterday
    yesterday_start = start_date - timedelta(days=1)
    yesterday_end = end_date - timedelta(days=1)
    yesterday_good_percentage = good_percentage_for_date_range(yesterday_start, yesterday_end)

    # Calculate the change
    change = today_good_percentage - yesterday_good_percentage[0]

    with SessionLocal() as session:
        try:
            # For overall results
            results = session.query(
                func.count(case(
                    (Transactions.Result == 'Bad Neck', Transactions.Id)
                    , else_=None)).label('NeckCount'),

                func.count(case(
                    (Transactions.Result == 'Bad Torso', 1)
                    , else_=None)).label('TorsoCount'),

                func.count(case(
                    (Transactions.Result == 'Bad NeckTorso', 1)
                    , else_=None)).label('NeckTorsoCount'),

            ).filter(
                Transactions.Datetime.between(start_date, end_date)
            ).first()

            # For intervals
            intervals = {}
            for start_hour, end_hour in [(0, 6), (6, 12), (12, 18), (18, 24)]:
                interval_data = session.query(
                    func.count(Transactions.Id).label('Count'),
                    func.count(case(
                        (Transactions.Result == 'Bad Neck', Transactions.Id)
                        , else_=None)).label('Neck'),

                    func.count(case(
                        (Transactions.Result == 'Bad Torso', 1)
                        , else_=None)).label('Torso'),

                    func.count(case(
                        (Transactions.Result == 'Bad NeckTorso', 1)
                        , else_=None)).label('NeckTorso'),

                ).filter(and_(
                    Transactions.Datetime.between(start_date, end_date),
                    func.extract('hour', Transactions.Datetime) >= start_hour,
                    func.extract('hour', Transactions.Datetime) < end_hour,
                )).first()
                intervals[f"{start_hour}-{end_hour}"] = {
                    'Count': interval_data.Count,
                    'Neck': interval_data.Neck,
                    'Torso': interval_data.Torso,
                    'NeckTorso': interval_data.NeckTorso
                }

            return {
                "Type": "Daily",
                "Average": today_good_percentage,
                "Change": change,
                "TotalCount": total_count,
                "NeckPercentage": results.NeckCount / total_count if total_count else 0,
                "TorsoPercentage": results.TorsoCount / total_count if total_count else 0,
                "NeckTorsoPercentage": results.NeckTorsoCount / total_count if total_count else 0,
                "Intervals": intervals
            }
        except Exception as e:
            raise e

def calculate_data_for_week():
    # Define the current week start and end dates
    today = date.today()
    start_date = today - timedelta(days=today.weekday())  # Start from Monday
    end_date = start_date + timedelta(days=7)

    # Define the last week start and end dates
    last_week_start = start_date - timedelta(days=7)
    last_week_end = start_date

    # Calculate good_posture_percentage for this week
    this_week_good_percentage, total_count = good_percentage_for_date_range(start_date, end_date)

    # Calculate good_posture_percentage for last week
    last_week_good_percentage, _ = good_percentage_for_date_range(last_week_start, last_week_end)

    # Calculate the change
    change = this_week_good_percentage - last_week_good_percentage

    with SessionLocal() as session:
        try:
            # For overall results
            results = session.query(
                func.count(case((Transactions.Result == 'Bad Neck', Transactions.Id), else_=None)).label('NeckCount'),
                func.count(case((Transactions.Result == 'Bad Torso', 1), else_=None)).label('TorsoCount'),
                func.count(case((Transactions.Result == 'Bad NeckTorso', 1), else_=None)).label('NeckTorsoCount'),
            ).filter(
                Transactions.Datetime.between(start_date, end_date)
            ).first()

            # For day intervals
            intervals = {}
            days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            for i, day_name in enumerate(days):
                day_start = start_date + timedelta(days=i)
                day_end = day_start + timedelta(days=1)
                interval_data = session.query(
                    func.count(Transactions.Id).label('Count'),
                    func.count(case((Transactions.Result == 'Bad Neck', Transactions.Id), else_=None)).label('Neck'),
                    func.count(case((Transactions.Result == 'Bad Torso', 1), else_=None)).label('Torso'),
                    func.count(case((Transactions.Result == 'Bad NeckTorso', 1), else_=None)).label('NeckTorso'),
                ).filter(
                    Transactions.Datetime.between(day_start, day_end)
                ).first()

                intervals[day_name] = {
                    'Count': interval_data.Count,
                    'Neck': interval_data.Neck,
                    'Torso': interval_data.Torso,
                    'NeckTorso': interval_data.NeckTorso
                }

            return {
                "Type": "Weekly",
                "Average": this_week_good_percentage,
                "Change": change,
                "TotalCount": total_count,
                "NeckPercentage": results.NeckCount / total_count if total_count else 0,
                "TorsoPercentage": results.TorsoCount / total_count if total_count else 0,
                "NeckTorsoPercentage": results.NeckTorsoCount / total_count if total_count else 0,
                "Intervals": intervals
            }
        except Exception as e:
            raise e


def calculate_data_for_month():
    # Define the current month start and end dates
    today = date.today()
    start_date = today.replace(day=1)
    next_month = today.replace(month=today.month % 12 + 1, day=1) if today.month != 12 else today.replace(
        year=today.year + 1, month=1, day=1)
    end_date = next_month

    # Define the last month start and end dates
    last_month_end = start_date
    last_month_start = (start_date - timedelta(days=1)).replace(day=1)

    # Calculate good_posture_percentage for this month
    this_month_good_percentage, total_count = good_percentage_for_date_range(start_date, end_date)

    # Calculate good_posture_percentage for last month
    last_month_good_percentage, _ = good_percentage_for_date_range(last_month_start, last_month_end)

    # Calculate the change
    change = this_month_good_percentage - last_month_good_percentage

    with SessionLocal() as session:
        try:
            # For overall results
            results = session.query(
                func.count(case((Transactions.Result == 'Bad Neck', Transactions.Id), else_=None)).label('NeckCount'),
                func.count(case((Transactions.Result == 'Bad Torso', 1), else_=None)).label('TorsoCount'),
                func.count(case((Transactions.Result == 'Bad NeckTorso', 1), else_=None)).label('NeckTorsoCount'),
            ).filter(
                Transactions.Datetime.between(start_date, end_date)
            ).first()

            # For week intervals
            intervals = {}
            for i in range(4):
                week_start = start_date + timedelta(days=i * 7)
                week_end = week_start + timedelta(days=7)
                interval_data = session.query(
                    func.count(Transactions.Id).label('Count'),
                    func.count(case((Transactions.Result == 'Bad Neck', Transactions.Id), else_=None)).label('Neck'),
                    func.count(case((Transactions.Result == 'Bad Torso', 1), else_=None)).label('Torso'),
                    func.count(case((Transactions.Result == 'Bad NeckTorso', 1), else_=None)).label('NeckTorso'),
                ).filter(
                    Transactions.Datetime.between(week_start, week_end)
                ).first()

                intervals[f"Week{i + 1}"] = {
                    'Count': interval_data.Count,
                    'Neck': interval_data.Neck,
                    'Torso': interval_data.Torso,
                    'NeckTorso': interval_data.NeckTorso
                }

            return {
                "Type": "Monthly",
                "Average": this_month_good_percentage,
                "Change": change,
                "TotalCount": total_count,
                "NeckPercentage": results.NeckCount / total_count if total_count else 0,
                "TorsoPercentage": results.TorsoCount / total_count if total_count else 0,
                "NeckTorsoPercentage": results.NeckTorsoCount / total_count if total_count else 0,
                "Intervals": intervals
            }
        except Exception as e:
            raise e