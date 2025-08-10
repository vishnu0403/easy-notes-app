from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, models, auth
from app.db import get_db
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

# -------- Signup --------
@router.post("/signup", response_model=schemas.UserOut)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    if db.query(models.User).filter(models.User.user_email == payload.user_email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed = auth.get_password_hash(payload.password)
    db_user = models.User(
        user_name=payload.user_name,
        user_email=payload.user_email,
        password=hashed
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# -------- Login --------
@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_email == form_data.username).first()

    if not user or not auth.verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")

    # Create JWT token
    access_token = auth.create_access_token({"sub": user.user_id})
    return {"access_token": access_token, "token_type": "bearer"}
