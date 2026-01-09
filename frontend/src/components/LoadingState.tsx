import { motion } from "framer-motion";

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16"
    >
      {/* Animated circles */}
      <div className="relative w-16 h-16 mb-6">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary/40"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Text */}
      <motion.p
        className="text-base font-medium text-foreground mb-2"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        กำลังประมวลผลไฟล์เสียงของคุณ...
      </motion.p>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        กำลังถอดเสียงและสรุปเนื้อหาของไฟล์เสียงของคุณ อาจใช้เวลาสักครู่สำหรับไฟล์ที่ยาว
      </p>

      {/* Progress dots */}
      <div className="flex gap-1 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
