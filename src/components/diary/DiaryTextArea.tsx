'use client';

import useZustandStore from '@/zustand/zustandStore';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
  diaryContent: string;
};

const DiaryTextArea = () => {
  const { content, setContent, isDiaryEditMode } = useZustandStore();
  const { control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      diaryContent: ''
    }
  });

  const diaryContent = watch('diaryContent');
  const charCount = diaryContent?.length || 0;

  useEffect(() => {
    if (isDiaryEditMode) {
      setValue('diaryContent', content);
    }
  }, [isDiaryEditMode, content, setValue]);

  const handleContentChange = (value: string) => {
    if (value.length <= 500) {
      setValue('diaryContent', value);
      setContent(value);
    }
  };

  return (
    <div className="flex flex-col md:w-552px-row md:h-195px-col md:gap-8px-col">
      <p className="text-16px-m md:text-18px text-font-color">Q. 오늘 나의 감정과 관련된 일을 적어주세요</p>
      <div className="border-[#A1A1A1] border rounded-[8px] w-335px-row-m bg-white md:w-[100%] md:pt-8px-col md:px-16px-row ">
        <Controller
          name="diaryContent"
          control={control}
          render={({ field }) => (
            <textarea
              className="text-font-color w-full md:w-[100%] md:h-163px-col rounded-[8px] resize-none custom-scrollbar text-14px-m md:text-18px outline-none"
              placeholder="오늘의 감정과 관련된 일을 작성해주세요.
                ex)오늘의 점심이 정말 맛있었어요. 정말 행복한 하루를 보낸 것 같아요."
              value={field.value}
              onChange={(e) => handleContentChange(e.target.value)}
              maxLength={500}
            />
          )}
        />
        <div className="relative w-full h-3 rounded-[8px]">
          <div className="rounded-[8px] absolute bottom-1 right-1 text-gray-400 text-12px-m md:text-14px">
            {charCount}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryTextArea;
