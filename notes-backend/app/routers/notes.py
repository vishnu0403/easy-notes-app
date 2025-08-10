from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models, auth
from app.db import get_db

router = APIRouter()

# -------- Create a note --------
@router.post("/", response_model=schemas.NoteOut)
def create_note(
    payload: schemas.NoteCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_note = models.Note(
        note_title=payload.note_title,
        note_content=payload.note_content,
        owner_id=current_user.user_id
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

# -------- List all notes --------
@router.get("/", response_model=List[schemas.NoteOut])
def list_notes(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    notes = db.query(models.Note).filter(models.Note.owner_id == current_user.user_id).all()
    return notes

# -------- Get a single note --------
@router.get("/{note_id}", response_model=schemas.NoteOut)
def get_note(
    note_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    note = db.query(models.Note).filter(
        models.Note.note_id == note_id,
        models.Note.owner_id == current_user.user_id
    ).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

# -------- Update a note --------
@router.put("/{note_id}", response_model=schemas.NoteOut)
def update_note(
    note_id: str,
    payload: schemas.NoteCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    note = db.query(models.Note).filter(
        models.Note.note_id == note_id,
        models.Note.owner_id == current_user.user_id
    ).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    note.note_title = payload.note_title
    note.note_content = payload.note_content
    db.commit()
    db.refresh(note)
    return note

# -------- Delete a note --------
@router.delete("/{note_id}", status_code=204)
def delete_note(
    note_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    note = db.query(models.Note).filter(
        models.Note.note_id == note_id,
        models.Note.owner_id == current_user.user_id
    ).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return
