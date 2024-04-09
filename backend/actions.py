from sqlalchemy.orm import Session
from models import User, SavedBooks
from pydantic import BaseModel

class SaveBookRequest(BaseModel):
    user_id: int
    book_title: str
    author: list

def check_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def check_user_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, username: str, email: str, hashed_password: str):
    db_user = User(username=username, email=email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session):
    return db.query(User).all()

async def save_book(
    db: Session, user_id: int, book_title: str, author: str, book_id: str, descriptions: str, images: str):
    saved_book = SavedBooks(
        user_id=user_id, book_title=book_title, author=author, book_id=book_id, descriptions=descriptions, images=images
    )
    db.add(saved_book)
    db.commit()
    db.refresh(saved_book)
    return saved_book

def save_book_for_current_user(
    db: Session, request: SaveBookRequest, current_user_id: int
):
    user = get_user_by_id(db, current_user_id)
    if user:
        return save_book(
            db, user_id=user.id, book_title=request.book_title, author=request.author
        )
    else:
        raise ValueError("Current user not found")

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_saved_books_by_user_id(db: Session, user_id: int):
    return db.query(SavedBooks).filter(SavedBooks.user_id == user_id).all()

def get_user_books(db: Session, user_id: int):
    return db.query(SavedBooks).filter(SavedBooks.user_id == user_id).all()

def is_book_saved_by_user(db: Session, user_id: int, book_id: int) -> bool:
    return (
        db.query(SavedBooks)
        .filter(SavedBooks.user_id == user_id, SavedBooks.book_id == book_id)
        .first()
        is not None
    )

def remove_book_from_user_list(db: Session, user_id: int, book_id: int) -> None:
    saved_book = (
        db.query(SavedBooks)
        .filter(SavedBooks.user_id == user_id, SavedBooks.book_id == book_id)
        .first()
    )
    if saved_book:
        db.delete(saved_book)
        db.commit()

