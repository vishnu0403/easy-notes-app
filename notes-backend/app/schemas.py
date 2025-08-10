from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ---------- User Schemas ----------
class UserCreate(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class UserOut(BaseModel):
    user_id: str
    user_name: str
    user_email: EmailStr
    create_on: datetime
    last_update: Optional[datetime]

    class Config:
        orm_mode = True

# ---------- Auth Schemas ----------
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

# ---------- Note Schemas ----------
class NoteCreate(BaseModel):
    note_title: str
    note_content: Optional[str] = None

class NoteOut(BaseModel):
    note_id: str
    note_title: str
    note_content: Optional[str]
    created_on: datetime
    last_update: Optional[datetime]
    owner_id: str

    class Config:
        orm_mode = True
