"""
Usage: uvicorn main:app --reload
"""

from dotenv import dotenv_values
import traceback
from fastapi import FastAPI, HTTPException, status, Request
from sqlalchemy import create_engine

from models.contact_form import ContactForm
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware

from models.metadata import MetaDataSingleton

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

config = dotenv_values(".env")

engine = create_engine("sqlite:///:memory:")
Session = sessionmaker(bind=engine)

# Create tables that do not exist.
metadata = MetaDataSingleton()
metadata.create_all(engine)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.options("/contact")
async def get_options():
    return {"Allow": "POST"}


@app.post("/contact")
async def create_contact_form(request: Request):
    try:
        data = await request.json()
        with Session() as session:
            name = f"{data['first-name']} {data['last-name']}"
            row = ContactForm(
                name=name,
                email=data["email"],
                message=data["message"],
            )
            session.add(row)
            session.commit()
            session.refresh(row)
        return row.to_json()
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Exception thrown: {str(e)}",
        )
