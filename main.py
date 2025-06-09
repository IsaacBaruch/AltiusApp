import requests
import random
import string
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Request

app = FastAPI()

class Item(BaseModel):
    mail: str
    password: float

# Allow requests from any origin (for testing only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origins in production
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, etc.
    allow_headers=["*"],  # Authorization, Content-Type, etc.
)

def get_random_string(length: int = 16) -> str:
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

# users - This represent users DB
users = [
    { "id": 1, "name": "Baruch Isaac", "mail": "baruchisaac@gmail.com", "password": "123456" },
    { "id": 2, "name": "Dekel", "mail": "dekel@gmail.com", "password": "ABC132DEF456" }
]

# tokens - This represent tokens DB
tokens = [
    { "id": 1, "token": get_random_string(16) },
    { "id": 2, "token": get_random_string(16) }
]

# tokens - This represent tokens DB
websites = [
    { "id": 1, "name": "Website 1", "url": "https://fo1.altius.finance", 'api': "https://fo1.api.altius.finance/api/v0.0.2/login", "username": "fo1_test_user@whatever.com", "password": "Test123!" },
    { "id": 2, "name": "Website 2", "url": "https://fo2.altius.finance", 'api': "https://fo2.api.altius.finance/api/v0.0.2/login", "username": "fo2_test_user@whatever.com", "password": "Test223!"}
]

print("@@@@@ Start app @@@@@")

def getUserByMail(mail: str):
    for user in users:
        if user.get("mail") == mail:
            return user
    return None

def getUserByToken(token: str):
    id = 0
    for item in tokens:
        if item.get("token") == token:
            id = item.get("id")
            break
    
    if id != 0:
        return id
    return None

def getTokenByUserId(id: int):
    for token in tokens:
        if token.get("id") == id:
            return token
    return None

def getWebsite(id: int):
    for website in websites:
        if website.get("id") == id:
            return website
    return None


@app.post("/login")
async def read_raw_data(request: Request):
    body = await request.json()
    print("body", body)
    if "password" not in body or "mail" not in body:
        raise HTTPException(status_code=422, detail="One of the params missing or invalid")
        
    user = getUserByMail(body.get("mail"))
    if user is None:
        print("user not exist")
        raise HTTPException(status_code=422, detail="Bad credentials")
    
    if user.get("password") != body.get("password"):
        print("Password invalid")
        raise HTTPException(status_code=403, detail="Bad credentials")

    userData = {
        "id": user.get("id"),
        "name": user.get("name"),
        "mail": user.get("mail")
    }
    token = getTokenByUserId(user.get("id"))

    return { "token": token.get("token"), "user": userData }

@app.post("/websites")
async def read_raw_data(request: Request):
    headers = request.headers
    if "Authorization" not in headers:
        raise HTTPException(status_code=422, detail="missing header")

    authorization = headers.get("Authorization")
    parts = authorization.split()
    if parts[0] != "Bearer" or len(parts) != 2:
        raise HTTPException(status_code=422, detail="One of the params missing or invalid")

    token = parts[1]
    userId = getUserByToken(token)
    if userId is None:
        raise HTTPException(status_code=403, detail="Invalid user")
   
    return { "data": websites }

@app.post("/loginWebsite")
async def read_raw_data(request: Request):
    body = await request.json()
    print("body", body)
    if "id" not in body or "username" not in body or "password" not in body:
        raise HTTPException(status_code=422, detail="One of the params missing or invalid")

    id = body.get("id")
    username = body.get("username")
    password = body.get("password")
    
    website = getWebsite(id)
    if website is None:
        print("website not exist")
        raise HTTPException(status_code=422, detail="One of the params missing or invalid")
    
    if website.get("username") != username or website.get("password") != password:
        print("Invalid credentials", website)
        raise HTTPException(status_code=422, detail="Bad credentials")
    

    data = loginWebsite(website, username, password)
    return { "data": data }

def loginWebsite(website, mail: str, password: str):
    print('@@@@@@ url this', website)
    url = website.get("url")
    login_url = website.get("api")

    payload = {
        "email": mail,
        "password": password
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Origin": url,
        "Referer": url + '/', 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
    }

    session = requests.Session()

    response = session.post(login_url, json=payload, headers=headers)

    if response.status_code == 200:
        print("✅ Login successful!")
        # auth_token = session.cookies.get("Authorization2")
        json = response.json().get("success")
        token = json.get("token")
        user = json.get("user")
        print("user:", json.get("user"))
        return { "token": token, "user": user }
    else:
        print("❌ Login failed")
        print("Status code:", response.status_code)
        print(response.text)
        raise HTTPException(status_code=response.status_code, detail="response.text")

