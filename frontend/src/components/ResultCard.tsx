import { motion } from "framer-motion";
import { FileText, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SpeechToSummaryResponse } from "@/lib/api";

interface ResultCardProps {
  result: SpeechToSummaryResponse;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span className="text-xs">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span className="text-xs">Copy</span>
        </>
      )}
    </Button>
  );
}

export function ResultCard({ result }: ResultCardProps) {
  const methodLabel =
    result.method === "hierarchical"
      ? "Hierarchical Summary"
      : "Single-shot Summary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-5 shadow-elevated"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Summary</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-surface-subtle border border-border"
            >
              {methodLabel}
            </Badge>
            <CopyButton text={result.summary} />
          </div>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {result.summary}
          </p>
        </div>
      </motion.div>

      {/* Transcript Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-5 shadow-elevated"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Transcript</h3>
          </div>
          <CopyButton text={result.transcript} />
        </div>
        <div className="max-h-64 overflow-y-auto scrollbar-thin">
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {result.transcript}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
