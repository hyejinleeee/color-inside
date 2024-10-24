'use client';

import useZustandStore from '@/zustand/zustandStore';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import CameraIcon from './assets/CameraIcon';
import Toast from '../common/modal/Toast';
import { convertHeicToJpeg } from '@/utils/imageFileUtils';

type FormValues = {
  img: File | null;
  preview: string | null;
};

const ImgDrop = () => {
  const { img, setImg, isDiaryEditMode } = useZustandStore();
  const { setValue, watch } = useForm<FormValues>({
    defaultValues: {
      img: null,
      preview: null
    }
  });

  const watchedPreview = watch('preview');

  useEffect(() => {
    if (isDiaryEditMode) {
      if (img) {
        setValue('preview', img as string);
      }
    }
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const lastDroppedFile = acceptedFiles[0]; //마지막 드롭한 파일
      if (!lastDroppedFile) return;

      if (lastDroppedFile.type === 'image/heif' || lastDroppedFile.type === 'image/heic') {
        const convertedFile = await convertHeicToJpeg(lastDroppedFile);

        setImg(convertedFile);
        setValue('img', convertedFile);
        setValue('preview', URL.createObjectURL(convertedFile));
      } else {
        setImg(lastDroppedFile);
        setValue('img', lastDroppedFile);
        setValue('preview', URL.createObjectURL(lastDroppedFile));
      }
    },
    [setImg, setValue]
  );

  const onDelete = useCallback(() => {
    setImg(null);
    setValue('img', null);
    setValue('preview', null);
  }, [setImg, setValue]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/heic': ['.heic', '.heif']
    }
  });

  return (
    <div className="flex flex-col gap-8px-col-m md:gap-8px-col md:w-335px-row md:h-152px-col">
      <p className="text-16px-m md:text-18px text-font-color">Q. 오늘 감정에 맞는 이미지가 있나요?</p>
      <div
        {...getRootProps()}
        className=" flex bg-[#F9F5F0] items-center justify-center rounded-[8px]  w-80px-row-m h-80px-row-m md:w-120px-row md:h-120px-row
        cursor-pointer "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23E6D3BC' strokeWidth='2' stroke-dasharray='6' stroke-dashoffset='0' strokeLinecap='square'/%3e%3c/svg%3e\")",
          borderRadius: '8px'
        }}
      >
        <input {...getInputProps()} />
        {isDragReject && <Toast toast={{ label: '허용된 형식: PNG, JPEG, HEIC, HEIF만 가능합니다.' }} />}
        {watchedPreview ? (
          <div className="relative w-80px-row-m h-80px-row-m md:w-120px-row md:h-120px-row rounded-[8px]">
            <Image src={watchedPreview} alt="Preview" fill className="w-full h-full object-cover rounded-[8px]" />
            <button
              type="button"
              onClick={onDelete}
              className="absolute top-2 right-2 bg-red-400 text-white rounded-full p-1 text-14px"
            >
              삭제
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-40px-col-m md:w-120px-row md:h-120px-row">
            <p className="text-12px-m md:text-14px">이미지 첨부</p>
            <div className="h-24px-row-m w-24px-col-m md:h-36px-row md:w-36px-row">
              <CameraIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgDrop;
