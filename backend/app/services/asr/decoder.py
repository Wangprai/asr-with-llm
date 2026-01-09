from pathlib import Path
from pyctcdecode import build_ctcdecoder
from app.services.asr.model import ASRModel

_decoder = None

def get_ctc_decoder():
    global _decoder
    if _decoder is None:
        asr = ASRModel()
        tokenizer = asr.processor.tokenizer
        vocab_size = asr.model.config.vocab_size

        # Get labels from the tokenizer
        labels = tokenizer.convert_ids_to_tokens(
            range(vocab_size)
        )

        # Replace the pad token with an empty string
        labels[tokenizer.pad_token_id] = ""

        BASE_DIR = Path(__file__).resolve().parents[3]
        KENLM_PATH = BASE_DIR / "6_gram_th.arpa"

        if not KENLM_PATH.exists():
            raise FileNotFoundError(f"KenLM model not found: {KENLM_PATH}")

        _decoder = build_ctcdecoder(
            labels=labels,
            kenlm_model_path=str(KENLM_PATH),
            alpha=0.6,
            beta=1.0
        )

    return _decoder
