import torch
from app.services.asr.model import ASRModel
from app.services.asr.preprocess import load_audio
from app.services.asr.decoder import get_ctc_decoder
from app.core.exceptions import ASRError

_asr_model = None

def get_asr_model():
    global _asr_model
    if _asr_model is None:
        _asr_model = ASRModel()
    return _asr_model

def transcribe(audio_path: str, use_lm: bool = True) -> str:
    try:
        model = get_asr_model()
        audio = load_audio(audio_path)
    except Exception as e:
        raise ASRError(f"โหลดไฟล์เสียงล้มเหลว: {str(e)}")

    try:
        inputs = model.processor(
            audio,
            sampling_rate=16000,
            return_tensors="pt",
            padding=True
        )

        with torch.no_grad():
            logits = model.model(
                inputs.input_values.to(model.device)
            ).logits

        if use_lm:
            decoder = get_ctc_decoder()
            text = decoder.decode(logits[0].cpu().numpy())
        else:
            predicted_ids = torch.argmax(logits, dim=-1)
            text = model.processor.decode(predicted_ids[0])

    except Exception as e:
        raise ASRError(f"ถอดเสียงล้มเหลว: {str(e)}")

    transcription = text.strip().lower()

    if not transcription:
        raise ASRError("ASR ให้ผลลัพธ์ว่าง")

    return transcription
