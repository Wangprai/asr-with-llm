from pydantic import BaseModel
from typing import Literal

class SpeechToSummaryResponse(BaseModel):
    transcript: str
    summary: str
    success: bool
    method: Literal["single", "hierarchical"] = "single"
