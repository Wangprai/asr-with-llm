// API Configuration - Change this URL to point to your backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface SpeechToSummaryResponse {
  transcript: string;
  summary: string;
  success: boolean;
  method: "single" | "hierarchical";
}

export interface ApiError {
  message: string;
  status?: number;
}

export async function uploadAudioForSummary(
  file: File
): Promise<SpeechToSummaryResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/pipeline/speech-to-summary`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `อัปโหลดไม่สำเร็จ ${response.status}`);
  }

  const data: SpeechToSummaryResponse = await response.json();
  
  if (!data.success) {
    throw new Error("มีข้อผิดพลาดในการประมวลผล กรุณาลองอีกครั้ง");
  }

  return data;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
