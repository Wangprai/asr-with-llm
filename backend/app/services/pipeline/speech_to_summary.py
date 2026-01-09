from app.services.asr.convert import convert_to_wav
from app.services.asr.inference import transcribe
from app.services.llm.chain import build_summary_chain
from app.services.llm.postprocess import clean_summary
from app.services.llm.hierarchical_summary import hierarchical_summary

import os

MAX_CHARS = 4000


def normalize_summary(summary):
    if isinstance(summary, list):
        return " ".join(summary)
    return summary


async def speech_to_summary(audio_path: str):
    wav_path = convert_to_wav(audio_path)

    try:
        transcript = transcribe(wav_path, use_lm=True)

        if not transcript.strip():
            return {
                "success": False,
                "method": "single",
                "transcript": "",
                "summary": "ไม่สามารถถอดเสียงจากไฟล์เสียงได้"
            }

        # select strategy
        if len(transcript) > MAX_CHARS:
            result = await hierarchical_summary(transcript)
            summary = normalize_summary(result["final_summary"])
            method = "hierarchical"
        else:
            chain = build_summary_chain()
            res = await chain.ainvoke({"text": transcript})
            summary = normalize_summary(
                clean_summary(res.content if hasattr(res, "content") else res)
            )
            method = "single"

        return {
            "success": True,
            "method": method,
            "transcript": transcript,
            "summary": summary
        }

    finally:
        if os.path.exists(wav_path):
            os.remove(wav_path)
