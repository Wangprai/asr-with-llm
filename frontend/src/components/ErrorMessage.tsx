import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">
        มีบางอย่างผิดพลาด
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          ลองอีกครั้ง
        </Button>
      )}
    </motion.div>
  );
}
