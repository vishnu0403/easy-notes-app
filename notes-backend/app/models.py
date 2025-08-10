from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base
from datetime import datetime
import uuid

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    user_id = Column(String(36), primary_key=True, default=gen_uuid)
    user_name = Column(String(150), nullable=False)
    user_email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    last_update = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    create_on = Column(DateTime, default=datetime.utcnow)

    # One-to-many relationship with notes
    notes = relationship("Note", back_populates="owner")

class Note(Base):
    __tablename__ = "notes"
    note_id = Column(String(36), primary_key=True, default=gen_uuid)
    note_title = Column(String(255), nullable=False)
    note_content = Column(Text, nullable=True)
    last_update = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_on = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)

    # Many-to-one relationship to user
    owner = relationship("User", back_populates="notes")
