from fastapi import APIRouter, HTTPException, Depends, Request
from httpx import AsyncClient
from pydantic import BaseModel
from database import get_db
from sqlalchemy.orm import Session
import actions
from .dep import get_current_user

router = APIRouter()

GOOGLE_BOOKS_API_KEY = "AIzaSyCs5bX3a2DOUYeCkOoEUxm_UhQ6uElcjfc"

class BookRequest(BaseModel):
    query: str

@router.post("/books/")
async def get_books(request: BookRequest):
    api_url = "https://www.googleapis.com/books/v1/volumes"
    params = {
        "q": request.query,
        "key": GOOGLE_BOOKS_API_KEY,
        "maxResults": 20,
    }

    async with AsyncClient() as client:
        response = await client.get(api_url, params=params)

        if response.status_code == 200:
            response_data = response.json()
            items = response_data.get("items", [])
            return response.json()

        raise HTTPException(status_code=response.status_code, detail=response.text)

@router.get("/user-books/{user_id}")
def get_user_books(user_id: int, db: Session = Depends(get_db)):
    return actions.get_user_books(db, user_id)

@router.post("/save-book")
async def save_book(
    request: Request,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user),
):
    try:
        data = await request.json()
        saved_book = await actions.save_book(
            db,
            user_id=current_user_id,
            book_title=data.get("book_title"),
            author=data.get("author"),
            book_id=data.get("book_id"),
            descriptions=data.get("descriptions"),
            images=data.get("images"),
        )
        return saved_book
    except Exception as e:
        print(f"Error saving book: {e}")
        raise HTTPException(status_code=500, detail="Failed to save book")

@router.delete("/remove-book/{user_id}/{book_id}")
def remove_book(user_id: int, book_id: str, db: Session = Depends(get_db)):
    try:
        if not user_id or not book_id:
            raise HTTPException(status_code=400, detail="Invalid user_id or book_id")
        if not actions.is_book_saved_by_user(db, user_id, book_id):
            raise HTTPException(status_code=404, detail="Book not found in user's list")
        actions.remove_book_from_user_list(db, user_id, book_id)
        return {"message": "Book removed successfully"}
    except Exception as e:
        print(f"Error removing book: {e}")
        raise HTTPException(status_code=500, detail="Failed to remove book")
