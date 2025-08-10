from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
import time

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

def init_db():
    """Try to create tables after DB starts."""
    max_retries = 8
    for i in range(max_retries):
        try:
            Base.metadata.create_all(bind=engine)
            break
        except Exception:
            if i < max_retries - 1:
                time.sleep(3)
            else:
                raise

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
