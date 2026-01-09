# ASR with Language Model (KenLM)

Thai Automatic Speech Recognition (ASR) system using **wav2vec 2.0**, **CTC decoding**, and **KenLM Language Model**, with a **FastAPI backend** and **React + Vite frontend**.

---

## 📌 Project Overview

This project aims to develop and evaluate a Thai ASR system by integrating:

* Acoustic Model (wav2vec 2.0)
* CTC-based decoder
* Statistical Language Model (KenLM)

The system allows comparison between **greedy decoding** and **LM-based decoding**, and is designed as a full-stack application.

---

## 🗂 Project Structure

```
asr-with-llm/
│
├── frontend/              # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   │   └── asr/
│   │   │       ├── inference.py
│   │   │       ├── decoder.py
│   │   │       └── model.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .venv/             # (ignored)
│
├── README.md
└── .gitignore
```

---

## ⚙️ Technologies Used

### Backend

* Python 3.10+
* FastAPI
* PyTorch
* HuggingFace Transformers
* KenLM
* pyctcdecode

### Frontend

* React
* TypeScript
* Vite
* Ant Design

---

## 🚀 How to Run the Project

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux / WSL
# .venv\Scripts\activate   # Windows PowerShell

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:8080
```

---

## 🧠 ASR Pipeline

1. Audio input (.wav)
2. Feature extraction (wav2vec2)
3. Acoustic model inference
4. CTC decoding

   * Greedy decoding
   * KenLM-based decoding
5. Text output

---

## 📊 Decoding Comparison

The system supports comparison between:

* **Greedy Decoder** (no language model)
* **CTC Decoder + KenLM**

Language Model helps improve:

* Word segmentation
* Spelling consistency
* Contextual correctness

---

## 📁 Excluded Files

The following files are excluded from the repository due to size and reproducibility:

* Language Model files (`.arpa`, `.bin`)
* Trained model weights (`.pt`, `.ckpt`)
* Audio datasets (`.wav`, `.mp3`)
* Virtual environments (`.venv`)

These can be regenerated using provided scripts or training pipelines.

---

## ⚠️ Known Limitations

* Vocabulary mismatch between ASR tokenizer and LM may reduce decoding accuracy
* Thai word segmentation remains challenging without subword/BPE modeling
* LM unigrams may not fully align with CTC labels

---

## 🎓 Use Case

* Academic project (Speech Recognition / NLP)
* ASR + Language Model evaluation
* Portfolio for AI / ML / NLP roles

---

## 👤 Author

**Wangphrai Julapetch**
Computer Science Graduate

---

## 📜 License

This project is for pratice and research purposes.
