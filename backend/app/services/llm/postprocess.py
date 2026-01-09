def clean_summary(text: str):
    lines = text.strip().split("\n")
    return [line.lstrip("-• ").strip() for line in lines if line.strip()]
