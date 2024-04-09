from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy import ForeignKey

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(150))

class SavedBooks(Base):
    __tablename__ = "saved_books"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_title = Column(String(100))
    author = Column(JSON)
    book_id = Column(String(100))
    descriptions = Column(String(3000))  
    images = Column(String(300))

class UserInDB(User):
    disabled: bool = False
