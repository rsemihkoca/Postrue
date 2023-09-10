from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from sqlalchemy.orm.attributes import InstrumentedAttribute

from .db import Base

class Transactions(Base):
    __tablename__ = 'Transactions'

    Datetime = Column(DateTime, primary_key=True)
    Year = Column(Integer, primary_key=True)
    Month = Column(Integer, primary_key=True)
    Day = Column(Integer, primary_key=True)
    ClientId = Column(Integer, primary_key=True)
    ClientName = Column(String)
    BadPosture = Column(Boolean)
    TorsoInclination = Column(Float)
    NeckInclination = Column(Float)
    Status = Column(String)

    """
    api:
    major problem: torso or neck
    """
    @classmethod
    def get_column_names(cls):
        # Use the declared attributes to get columns and filter out anything that's not a column
        return [key for key, column in cls.__dict__.items() if isinstance(column, InstrumentedAttribute)]
