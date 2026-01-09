import librosa
import numpy as np

TARGET_SR = 16000

def load_audio(file_path: str):
    audio, sr = librosa.load(file_path, sr=TARGET_SR, mono=True)
    return audio
