import heic2any from 'heic2any';

//작성폼에서 url인풋 받으면 file로 변환
export const urlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split('/').slice(-1)[0];
  const extension = filename.split('.').slice(-1)[0];
  const metadata = { type: `image/${extension}` };
  return new File([blob], filename, metadata);
};

// 로컬스토리지에 이미지 저장 시
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

//heic,heif jpeg로 변환
export const convertHeicToJpeg = async (lastDroppedFile: File) => {
  try {
    const result = await heic2any({ blob: lastDroppedFile, toType: 'image/jpeg' });
    const convertedBlob = Array.isArray(result) ? result[0] : result;

    const jpgFile = new File([convertedBlob], lastDroppedFile.name.replace(/\.[^/.]+$/, '.jpg'), {
      type: 'image/jpeg'
    });

    return jpgFile;
  } catch (err) {
    console.error('Error converting HEIF image:', err);
    throw err;
  }
};
