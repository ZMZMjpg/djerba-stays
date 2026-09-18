export type MediaKind = "images" | "videos";

export function uploadPropertyMedia(
  propertyId: string,
  kind: MediaKind,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      reject(new Error("Cloudinary is not configured. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local."));
      return;
    }

    const resourceType = kind === "videos" ? "video" : "image";
    const url = "https://api.cloudinary.com/v1_1/" + cloudName + "/" + resourceType + "/upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "djerba-stays/" + propertyId + "/" + kind);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress((event.loaded / event.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url as string);
      } else {
        reject(new Error("Upload failed with status " + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed. Check your connection and try again."));
    xhr.send(formData);
  });
}

export async function deletePropertyMediaByUrl(url: string): Promise<void> {
  // Unsigned Cloudinary uploads can't be deleted from the browser (deletion requires
  // a signed request with your API secret, which must never be exposed client-side).
  // Removing the URL from Firestore (already done by the caller) hides it from the site;
  // to actually delete the file from Cloudinary storage, remove it manually from the
  // Cloudinary Media Library dashboard, or add a small server-side API route later.
}