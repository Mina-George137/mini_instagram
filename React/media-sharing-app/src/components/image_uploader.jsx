import { useState } from 'react';
import { addMedia } from "../API/api_manager";

export function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Handle image upload event and dispatch custom event when done.
   * @param {Event} e 
   */
  async function handleChange(e) {
    setIsUploading(true);
    // Read the file and upload it to the server
    const uploadedMedia = await addMedia(e.target.files[0]);

    // Log the uploaded media to the console
    console.log("Inside Image Uploader");
    console.log(uploadedMedia);

    setIsUploading(false);

    // Dispatch custom event to notify other components that the media has been uploaded
    document.dispatchEvent(
      new CustomEvent("mediaUploaded", { detail: uploadedMedia })
    );
  } 

  return (
    <div className="image-uploader-container">
      <label htmlFor="file-upload" className="upload-button">Choose File</label>
      <input id="file-upload" type="file" onChange={handleChange}  />
      {isUploading && <div className="upload-indicator">Uploading...</div>}
    </div>
  );
}
