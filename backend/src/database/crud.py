from sqlalchemy.sql.functions import func
from .db import SessionLocal, engine, Base
from .models import Transactions
from datetime import datetime
import time
from functools import wraps

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
