import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileAudio, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/api";

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  isProcessing: boolean;
}

const ACCEPTED_TYPES = [".wav", ".mp3", ".m4a"];
const ACCEPTED_MIME_TYPES = ["audio/wav", "audio/mpeg", "audio/mp4", "audio/x-m4a"];

export function AudioUpload({
  onFileSelect,
  selectedFile,
  onClearFile,
  isProcessing,
}: AudioUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    return (
      ACCEPTED_TYPES.includes(extension) ||
      ACCEPTED_MIME_TYPES.includes(file.type)
    );
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (isProcessing) return;

      const files = e.dataTransfer.files;
      if (files && files[0] && validateFile(files[0])) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect, isProcessing]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0] && validateFile(files[0])) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="audio-upload"
              className={`
                relative flex flex-col items-center justify-center w-full h-48 
                border-2 border-dashed rounded-xl cursor-pointer
                transition-all duration-200 ease-out
                ${
                  isDragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }
                ${isProcessing ? "pointer-events-none opacity-50" : ""}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <motion.div
                  animate={{ scale: isDragActive ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload
                    className={`w-10 h-10 mb-4 transition-colors duration-200 ${
                      isDragActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
                <p className="mb-2 text-sm text-foreground">
                  <span className="font-medium">คลิกเพื่ออัปโหลด</span> หรือลากและวางไฟล์ที่นี่
                </p>
                <p className="text-xs text-muted-foreground">
                  WAV, MP3, or M4A audio files
                </p>
              </div>
              <input
                id="audio-upload"
                type="file"
                className="hidden"
                accept={ACCEPTED_TYPES.join(",")}
                onChange={handleFileInput}
                disabled={isProcessing}
              />
            </label>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-4 bg-surface-subtle border border-border rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <FileAudio className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {!isProcessing && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearFile}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
