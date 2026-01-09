from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai.chat_models import ChatGoogleGenerativeAIError
from app.core.config import settings
import os


def get_gemini_llm():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Add a valid key to backend/.env or set the environment variable."
        )

    try:
        return ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.3,
            google_api_key=api_key,
        )
    except ChatGoogleGenerativeAIError as e:
        # surface a clearer actionable message for expired/invalid API keys
        msg = str(e)
        if "API key expired" in msg or "API_KEY_INVALID" in msg:
            raise RuntimeError(
                "Google Gemini API key appears expired or invalid. Renew the key in Google Cloud Console and update GEMINI_API_KEY in backend/.env."
            ) from e
        raise
