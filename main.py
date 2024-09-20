from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from pypdf import PdfReader
from gtts import gTTS
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from googleapiclient.discovery import build
from dotenv import load_dotenv



load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class QueryRequest(BaseModel):
    query: str

API_KEY = os.getenv("API")
SEARCH_ENGINE_ID = os.getenv("ID")

AUDIO_DIR = "audio_files/"
os.makedirs(AUDIO_DIR, exist_ok=True)


def fetch_definition_from_google(query: str):
    service = build("customsearch", "v1", developerKey=API_KEY)
    result = service.cse().list(q=query, cx=SEARCH_ENGINE_ID, num=1).execute()
    
   
    search_item = result['items'][0]
    title = search_item['title']
    snippet = search_item['snippet']
    link = search_item['link']
    
    return f"Title: {title}\nSnippet: {snippet}\nLink: {link}"

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    pdf_reader = PdfReader(file.file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()

    
    abstracted_text = text[:500]  

    
    tts = gTTS(abstracted_text)
    audio_path = os.path.join(AUDIO_DIR, "response.mp3")
    tts.save(audio_path)

    return {"message": "PDF uploaded and processed", "audio_url": "/audio"}

@app.get("/audio")
async def get_audio():
   
    audio_path = os.path.join(AUDIO_DIR, "response.mp3")
    return FileResponse(audio_path)

@app.post("/query/")
async def handle_query(request: QueryRequest):
    query = request.query
    definition = fetch_definition_from_google(query)
    return {"text": definition}