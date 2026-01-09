import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioUpload } from "@/components/AudioUpload";
import { LoadingState } from "@/components/LoadingState";
import { ResultCard } from "@/components/ResultCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { uploadAudioForSummary, type SpeechToSummaryResponse } from "@/lib/api";

type AppState = "idle" | "processing" | "success" | "error";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<SpeechToSummaryResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError("");
  }, []);

  const handleClearFile = useCallback(() => {
    setSelectedFile(null);
    setError("");
  }, []);

  const handleReset = useCallback(() => {
    setState("idle");
    setSelectedFile(null);
    setResult(null);
    setError("");
  }, []);

  const handleProcess = useCallback(async () => {
    if (!selectedFile) return;

    setState("processing");
    setError("");

    try {
      const response = await uploadAudioForSummary(selectedFile);
      setResult(response);
      setState("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setState("error");
    }
  }, [selectedFile]);

  const handleRetry = useCallback(() => {
    setState("idle");
    setError("");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Thai Summary Helper
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  แพลทฟอร์มช่วยสรุปเนื้อหาจากไฟล์เสียงด้วย AI
                </p>
              </div>
            </div>
            {(state === "success" || state === "error") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  อัปโหลดใหม่
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero text */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl sm:text-3xl font-semibold text-foreground mb-3"
                >
                  เปลี่ยนเสียงให้เป็นข้อความ
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-muted-foreground max-w-md mx-auto"
                >
                  อัปโหลดไฟล์เสียงของคุณและรับการถอดเสียงด้วยระบบ AI พร้อมบทสรุปที่กระชับ เข้าใจง่าย
                </motion.p>
              </div>

              {/* Upload Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-elevated"
              >
                <AudioUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onClearFile={handleClearFile}
                  isProcessing={false}
                />

                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 flex justify-end"
                  >
                    <Button onClick={handleProcess} className="gap-2">
                      <Mic className="w-4 h-4" />
                      Process Audio
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  {
                    title: "Thai Support",
                    desc: "เหมาะสมสำหรับภาษาไทย",
                  },
                  {
                    title: "Smart Summary",
                    desc: "สามารถสรุปเนื้อหาได้อย่างชาญฉลาด ใช้งานกับไฟล์ยาวๆ ได้",
                  },
                  {
                    title: "Use Language Model",
                    desc: "ใช้ Language Model ในการปรับปรุงคุณภาพการถอดเสียง",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-xl bg-surface-subtle border border-border/50"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {feature.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {state === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-2xl shadow-elevated"
            >
              <LoadingState />
            </motion.div>
          )}

          {state === "success" && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ResultCard result={result} />
            </motion.div>
          )}

          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-2xl shadow-elevated"
            >
              <ErrorMessage message={error} onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-muted-foreground">
            Powered by AI • Supports WAV, MP3, and M4A audio files
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
