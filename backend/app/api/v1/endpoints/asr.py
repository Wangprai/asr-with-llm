import os
import shutil
import tempfile
from fastapi import APIRouter, UploadFile, File

from app.services.asr.inference import transcribe

router = APIRouter(prefix="/asr", tags=["ASR"])

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    suffix = os.path.splitext(file.filename)[-1]

    temp_dir = tempfile.gettempdir()  
    temp_path = os.path.join(temp_dir, next(tempfile._get_candidate_names()) + suffix)

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = transcribe(temp_path)

    os.remove(temp_path)

    return {
        "transcript": text
    }
