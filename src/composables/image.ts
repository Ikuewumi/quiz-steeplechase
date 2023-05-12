
/**
 * Reads an image file and converts it to a base64-encoded data URL.
 * @param {File} img - The image file to read.
 * @returns {Promise<string>} A promise that resolves to the base64-encoded data URL of the image.
 * @throws {Error} If there was an error reading the image file.
 */
export const readImageToText = async (img: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl);
    };

    reader.onerror = () => { reject(reader.error) };

    reader.readAsDataURL(img);
  });
}




/**
 * Returns a Promise that resolves to a file object selected from an HTMLInputElement, provided that the file is an image and its size is within a specified limit.
 * @param input The input element to get the file from.
 * @param kbSize The maximum file size in kilobytes.
 * @returns A Promise that resolves to the selected file object.
 * @throws If no file is present, if the file is not an image, or if the file is too large.
 */
export const getFileFromInput = async(input: HTMLInputElement, kbSize = 100)  : Promise<File> => {
  const files = input.files;
  if (!files || files.length === 0) { throw new Error("No file present!"); }
  
  const file = files.item(0);
  if (!file) { throw new Error("No file present!"); }
  if (!file.type.startsWith("image")) { throw new Error("File is not an image."); }
  
  const maxSizeBytes = kbSize * 1000;
  if (file.size > maxSizeBytes) { throw new Error(`File must not be larger than ${kbSize}kb.`); }
  
  return file;
}
