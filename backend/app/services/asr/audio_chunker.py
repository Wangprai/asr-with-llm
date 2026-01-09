import librosa
import numpy as np
from typing import List

def split_audio(
    file_path: str,
    chunk_duration: float = 30.0,  # seconds
    sr: int = 16000
) -> List[np.ndarray]:
    audio, _ = librosa.load(file_path, sr=sr, mono=True)

    samples_per_chunk = int(chunk_duration * sr)
    chunks = []

    for i in range(0, len(audio), samples_per_chunk):
        chunk = audio[i:i + samples_per_chunk]
        if len(chunk) > sr:  
            chunks.append(chunk)

    return chunks
