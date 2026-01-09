from app.services.asr.audio_chunker import split_audio
from app.services.asr.inference_long import transcribe_chunks

def transcribe_long_audio(audio_path: str) -> str:
    chunks = split_audio(audio_path)
    transcript = transcribe_chunks(chunks)
    return transcript
