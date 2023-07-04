from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Item(BaseModel):
    id:int
    content:str

app = FastAPI()

@app.get("/hello")
def sayHello():
    return {"message": "안녕하세요."}

@app.get("/")
def sayWelcome():
    return {"message" : "환영합니다."}

items = ["맥북", "애플워치", "아이폰", "에어팟"]

@app.get("/items")
def read_items(skip:int=0, limit:int=10):
    return items[skip:skip+limit]

@app.get("/items/{id}")
def read_id_items(id):
    return items[int(id)]

@app.post("/items")
def post_item(item:Item):
    items.append(item.content)
    return "success"

answer = "TRAIN"

@app.get("/answer")
def get_answer():
    return answer

app.mount("/wordle", StaticFiles(directory="static", html=True), name="static")