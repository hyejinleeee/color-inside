'use client';

import { useModal } from '@/providers/modal.context';
import { useToast } from '@/providers/toast.context';
import { Diary, DiaryContainerProps } from '@/types/diary.type';
import { deleteFromLocal, fetchLocalDiary } from '@/utils/diaryLocalStorage';
import useZustandStore from '@/zustand/zustandStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import TextButton from '../common/TextButton';
import PencilIcon from './assets/PencilIcon ';
import TrashBinIcon from './assets/TrashBinIcon';
import XIconWhite from './assets/XIconWhite';
import DiaryContent from './DiaryContent';
import CircleUI from './CircleUI';

const GuestDiaryContainer: React.FC<DiaryContainerProps> = ({ diaryId, form, YYMM }) => {
  const router = useRouter();
  const toast = useToast();
  const modal = useModal();

  const { setColor, setTags, setContent, setImg, setIsDiaryEditMode } = useZustandStore();
  const [guestDiary, setGuestDiary] = useState<Diary | null>(null);
  const [isGuestDiaryLoading, setIsGuestDiaryLoading] = useState(true);

  useEffect(() => {
    const fetchedLocalDiary = fetchLocalDiary(diaryId);

    if (fetchedLocalDiary) {
      setGuestDiary(fetchedLocalDiary);
    } else {
      toast.on({ label: '해당 다이어리를 찾을 수 없습니다.(비회원)' });
      router.push('/');
    }

    setIsGuestDiaryLoading(false);
  }, [router, diaryId, setColor, setTags, setContent, setImg]);

  if (isGuestDiaryLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const diaryData = guestDiary;

  if (!diaryData) {
    return <p>No diary found</p>;
  }

  const handleBackward = () => {
    router.back();
  };

  const handleEdit = () => {
    setColor(diaryData.color);
    setTags(diaryData.tags);
    setContent(diaryData.content);
    setImg(diaryData.img ? diaryData.img : null);

    setIsDiaryEditMode(true);

    router.push(`/diaries/edit/${diaryId}`);
  };

  const confirmDeleteGuestDiary = () => {
    deleteFromLocal(diaryId);
    router.replace(`/?form=${form}&YYMM=${YYMM}`);
    modal.close();
  };

  const handleDeleteGuestDiary = (): void => {
    modal.open({
      label: '내 기록을 삭제하면 다시 볼 수 없어요./정말 삭제하실건가요?',
      onConfirm: confirmDeleteGuestDiary,
      onCancel: () => modal.close(),
      confirmButtonContent: {
        children: '기록 삭제하기',
        icon: <TrashBinIcon />
      },
      cancelButtonContent: {
        children: '삭제하지 않기',
        icon: <XIconWhite />
      }
    });
  };

  return (
    <>
      <div
        className="flex items-center justify-center h-h-screen-custom md:h-screen md:pt-[80px] md:!bg-[#FEFDFB] "
        style={{ backgroundColor: diaryData.color }}
      >
        <div
          className="relative flex flex-col md:flex md:flex-row items-center justify-center gap-8px-col-m md:gap-16px-row md:w-720px-row md:h-807px-col rounded-[32px] md:border-4 md:border-[#E6D3BC] md:py-56px-col md:pr-56px-row md:pl-16px-row "
          style={{ backgroundColor: diaryData.color }}
        >
          <CircleUI />
          <div className="relative flex flex-col flex-start justify-center w-335px-row-m h-603px-col-m px-24px-row-m py-24px-col-m bg-white md:w-600px-row md:h-696px-col rounded-[32px] border border-[#E6D3BC] md:px-60px-row md:py-40px-col md:gap-40px-col">
            <div className="md:w-480px-row md:h-530px-col">
              <div className="flex justify-between">
                <div className="invisible md:visible">
                  <TextButton onClick={handleBackward}>뒤로가기</TextButton>
                </div>
                <div className="relative flex gap-12px-row-m md:gap-8px-row"></div>
              </div>
              <div className="items-start justify-start ">
                <DiaryContent diary={diaryData} />
              </div>
            </div>
            <div className="flex justify-end gap-16px-row-m md:gap-16px-row">
              <Button onClick={handleEdit} icon={<PencilIcon />}>
                수정하기
              </Button>
              <Button onClick={handleDeleteGuestDiary} priority="secondary" icon={<TrashBinIcon />}>
                삭제하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestDiaryContainer;
