import { Request } from "express";

export async function saveFile(req: Request): Promise<string> {
  if (!req.file) {
    throw new Error("No File Uploaded");
  }

  const filePath = req.file.path;
  return filePath;
}
