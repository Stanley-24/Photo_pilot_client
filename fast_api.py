# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend origin during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Review(BaseModel):
    name: str
    text: str
    avatar: str = ""
    rating: int = 5

db = []  # Mock database

@app.get("/api/reviews")
def get_reviews():
    return list(reversed(db))  # Return latest first

@app.post("/api/reviews")
def add_review(review: Review):
    db.append(review.dict())
    return review
