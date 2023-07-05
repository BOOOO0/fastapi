from fastapi import FastAPI, UploadFile, Form
from typing import Annotated
from fastapi.staticfiles import StaticFiles
import sqlite3

con = sqlite3.connect("db.db", check_same_thread=False)
cur = con.cursor()

app = FastAPI()

@app.post("/items")
async def create_item(title : Annotated[str,Form()],
                image : UploadFile,
                price : Annotated[int,Form()],
                description : Annotated[str,Form()],
                place : Annotated[str,Form()]
                ):
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items (title, image, price, description, place)
                VALUES ("{title}","{image_bytes.hex()}","{price}","{description}","{place}")
                """)
    con.commit()
    return "200"

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")