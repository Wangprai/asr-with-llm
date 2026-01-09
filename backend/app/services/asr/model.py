import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

MODEL_NAME = "Wangprai/wav2vec2-th"

class ASRModel:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.processor = Wav2Vec2Processor.from_pretrained(MODEL_NAME)
        self.model = Wav2Vec2ForCTC.from_pretrained(MODEL_NAME)
        self.device = torch.device("cpu")
        self.model.to(self.device)
        self.model.eval()

    def get_processor(self):
        return self.processor

    def get_model(self):
        return self.model
