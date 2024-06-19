from typing import Optional
from sqlalchemy import MetaData

"""
Metadata singleton object that allows us to track all the tables using the same instance.
"""
class MetaDataSingleton:
    _instance: Optional[MetaData] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = MetaData()
        return cls._instance
