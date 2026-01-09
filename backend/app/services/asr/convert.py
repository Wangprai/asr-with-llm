import subprocess
import os

def convert_to_wav(input_path: str) -> str:
    output_path = os.path.splitext(input_path)[0] + ".wav"

    command = [
        "ffmpeg",
        "-y",
        "-i", input_path,
        "-ac", "1",
        "-ar", "16000",
        output_path
    ]

    subprocess.run(
        command,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=True
    )

    return output_path
