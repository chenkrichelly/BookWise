from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models
from routers.users import router as user_router
from routers.library import router as library_router

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "BookWise is running!"}

@app.get("/check-db")
def check_db_connection():
    try:
        db = SessionLocal()
        db.execute("SELECT 1") 
        return {"message": "Database connection successful"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Database connection error: {str(e)}"
        )
    finally:
        db.close()

app.include_router(user_router)
app.include_router(library_router)
