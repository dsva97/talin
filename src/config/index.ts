import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const TMP_DIR = path.resolve(__dirname, "..", "..", "tmp");
export const ROOT_DIR = path.resolve(__dirname, "..", "..");
export const MODEL_VOICE_RECOGNITION_PATH = process.env
  .MODEL_VOICE_RECOGNITION_PATH as string;
