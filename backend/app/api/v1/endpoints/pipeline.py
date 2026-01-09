import os
import shutil
import tempfile
from fastapi import APIRouter, UploadFile, File

from app.services.pipeline.speech_to_summary import speech_to_summary
from app.schemas.pipeline import SpeechToSummaryResponse

router = APIRouter(prefix="/pipeline", tags=["Pipeline"])

@router.post(
    "/speech-to-summary",
    response_model=SpeechToSummaryResponse
)
async def speech_to_summary_api(file: UploadFile = File(...)):
    suffix = os.path.splitext(file.filename)[-1]
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(
        temp_dir,
        next(tempfile._get_candidate_names()) + suffix
    )

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = await speech_to_summary(temp_path)

    os.remove(temp_path)

    return result

@router.post(
    "/speech-to-summary/long",
    response_model=SpeechToSummaryResponse
)
async def speech_to_summary_long_api(file: UploadFile = File(...)):
    suffix = os.path.splitext(file.filename)[-1]
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(
        temp_dir,
        next(tempfile._get_candidate_names()) + suffix
    )

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = await speech_to_summary(temp_path)

    os.remove(temp_path)

    return result