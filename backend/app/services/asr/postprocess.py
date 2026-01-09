def normalize_transcript(text: str) -> str:
    text = text.replace("  ", " ")
    text = text.replace("\n", " ")
    return text.strip()