from typing import List
import torch

from app.services.asr.inference import get_asr_model
from app.services.asr.tokenizer import get_tokenizer

def transcribe_chunks(chunks: List, sr: int = 16000) -> str:
    model = get_asr_model()
    tokenizer = get_tokenizer()

    transcripts = []

    for chunk in chunks:
        inputs = tokenizer(
            chunk,
            sampling_rate=sr,
            return_tensors="pt"
        )

        with torch.no_grad():
            logits = model(inputs.input_values).logits

        predicted_ids = torch.argmax(logits, dim=-1)
        text = tokenizer.batch_decode(predicted_ids)[0]

        transcripts.append(text.strip())

    return " ".join(transcripts)
