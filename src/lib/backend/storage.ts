import { createHash } from "node:crypto";
import { backendConfig, isStorageConfigured } from "./config";

function signUpload(params: Record<string, string>) {
  const sorted = Object.entries(params)
    .filter(([, value]) => value)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${sorted}${backendConfig.cloudinaryApiSecret}`)
    .digest("hex");
}

export async function uploadFiles(files: File[], contextKey: string) {
  if (!isStorageConfigured()) {
    throw new Error("Storage provider is not configured.");
  }

  const uploaded = [];

  for (const file of files) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = `${backendConfig.cloudinaryFolder}/${contextKey}`;
    const params = {
      folder,
      timestamp
    };
    const signature = signUpload(params);
    const body = new FormData();
    body.set("file", file);
    body.set("api_key", backendConfig.cloudinaryApiKey);
    body.set("timestamp", timestamp);
    body.set("folder", folder);
    body.set("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${backendConfig.cloudinaryCloudName}/auto/upload`,
      {
        method: "POST",
        body
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed: ${errorText}`);
    }

    const json = await response.json();
    uploaded.push({
      name: file.name,
      size: file.size,
      type: file.type,
      url: json.secure_url
    });
  }

  return uploaded;
}
