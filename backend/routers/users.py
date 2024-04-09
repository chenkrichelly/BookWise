from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
import authentication, actions
from .dep import get_current_user, create_access_token
from actions import get_user_by_id
from pydantic import BaseModel
from datetime import timedelta

class Token(BaseModel):
    access_token: str
    token_type: str

router = APIRouter()

@router.post("/register")
def register(user_data: dict, db: Session = Depends(get_db)):
    username = user_data.get("username")
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email format")
    db_user = actions.check_username(db, username=username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user_by_email = actions.check_user_email(db, email=email)
    if db_user_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = authentication.get_password_hash(password)

    return actions.create_user(db, username, email, hashed_password)

@router.post("/login", response_model=Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):

    user = actions.check_username(db, username=form_data.username)
    if user and authentication.verify_password(
        form_data.password, user.hashed_password
    ):
        print("user logged in succesfully")

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")

@router.get("/list-users")
def list_users(db: Session = Depends(get_db)):
    users_list = actions.get_all_users(db)
    print(f"list-of-users:")
    for user in users_list:
        print(f" {user.username},")
    if not users_list:
        print("no users exist yet")

    return {"message": "List of users printed to console"}

@router.get("/current-user")
async def get_current_user_details(
    current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)
):
    try:
        user = get_user_by_id(db, current_user_id)
        if user:
            return user
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
