'use client';

import useZustandStore from '@/zustand/zustandStore';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
  inputValue: string;
  tags: string[];
};

const EmotionTagsInput = () => {
  const { isDiaryEditMode, testResult, hasTestResult, setHasTestResult, tags, setTags } = useZustandStore();

  const {
    control,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      inputValue: '',
      tags: []
    }
  });

  const inputValue = watch('inputValue');
  const watchedTags = watch('tags', tags);

  useEffect(() => {
    if (isDiaryEditMode) {
      setValue('inputValue', '');
      setValue('tags', tags);
    } else if (hasTestResult && testResult) {
      setHasTestResult(false);
      setValue('inputValue', testResult.result.emotion);
      setValue('tags', tags);
    } else {
      setTags([]);
      setValue('tags', []);
    }
  }, [isDiaryEditMode, hasTestResult, testResult, setHasTestResult, setValue]);

  const validateTags = (tagsArray: string[]) => {
    if (tagsArray.length > 5) {
      return '태그는 최대 5개만 입력할 수 있습니다.';
    }
    return null;
  };

  const addTag = (newTag: string) => {
    const newTags = [...watchedTags, newTag];
    const validationError = validateTags(newTags);
    if (validationError) {
      setError('tags', { type: 'manual', message: validationError });
    } else {
      setValue('inputValue', '');
      setTags(newTags);
      setValue('tags', newTags);
      clearErrors('tags');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.nativeEvent.isComposing === false) {
        event.stopPropagation();
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
          if (!watchedTags.includes(trimmedValue)) {
            addTag(trimmedValue);
          } else {
            setError('tags', { type: 'manual', message: '단어가 중복됩니다.' });
          }
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('inputValue', event.target.value);
    clearErrors('tags');
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const newTags = watchedTags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
    setValue('tags', newTags);
  };

  return (
    <div className="flex flex-col md:w-552px-row md:h-94px-col md:gap-8px-col">
      <p className="text-16px-m md:text-18px text-font-color">Q. 오늘 나의 감정태그를 작성해볼까요?</p>
      <div
        className={`flex items-center md:w-552px-row md:h-35px-col md:py-8px-col md:px-16px-row md:gap-16px-row rounded-[8px] border custom-scrollbar ${
          errors.tags ? 'border-red-500' : 'border-[#A1A1A1]'
        }`}
        style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}
      >
        {watchedTags.map((tag, index) => (
          <div
            key={index}
            className="flex justify-between h-20px-col-m md:h-24px-col md:gap-4px-row  items-center bg-[#F7F0E9] rounded outline-none overflow-hidden"
            style={{ flexShrink: 0 }}
          >
            <span className="text-font-color text-14px-m md:text-14px md:ml-8px-row">{tag}</span>
            <button
              type="button"
              className="text-font-color text-14px-m md:text-14px md:mr-8px-row"
              onClick={() => handleDeleteTag(tag)}
            >
              X
            </button>
          </div>
        ))}
        <Controller
          name="inputValue"
          control={control}
          render={({ field }) => (
            <textarea
              className="text-font-color items-center justify-center outline-none rounded overflow-hidden resize-none  text-14px-m md:text-14px w-335px-row-m h-35px-col-m md:w-552px-row md:h-35px-col md:py-8px-col "
              placeholder={watchedTags.length === 0 ? 'ex) 행복   감사하는_마음  만족' : ''}
              value={field.value}
              onChange={(e) => {
                handleInputChange(e);
                field.onChange(e);
              }}
              onKeyDown={handleKeyDown}
              style={{ minWidth: '100px' }}
            />
          )}
        />
      </div>
      {errors.tags ? (
        <p className="text-red-500 text-12px-m md:text-14px">{errors.tags.message}</p>
      ) : (
        <p className="text-[#a1a1a1] text-12px-m  md:text-14px">엔터를 눌러 태그를 입력해주세요.</p>
      )}
    </div>
  );
};

export default EmotionTagsInput;
