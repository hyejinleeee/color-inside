'use client';

import { fetchDiary } from '@/apis/diary';
import { useModal } from '@/providers/modal.context';
import { useToast } from '@/providers/toast.context';
import useZustandStore from '@/zustand/zustandStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import TextButton from '../common/TextButton';
import PencilIcon from './assets/PencilIcon ';
import TrashBinIcon from './assets/TrashBinIcon';
import XIconWhite from './assets/XIconWhite';
import DiaryContent from './DiaryContent';
import StickerPicker from './StickerPicker';
import Sticker from './Sticker';
import CircleUI from './CircleUI';
import { v4 as uuidv4 } from 'uuid';
import SmilePlusIcon from './assets/SmilePlusIcon';
import SaveIcon from './assets/SaveIcon';
import XIconBlack from './assets/XIconBlack';
import TipBubble from './assets/TipBubble';
import { fetchStickers, saveStickers } from '@/apis/stickers';
import { DiaryContainerProps } from '@/types/diary.type';

type StickerType = {
  id: string;
  component: JSX.Element;
  position: { x: number; y: number };
};

type StickerDataType = {
  id: string;
  component: string;
  position: { x: number; y: number };
};

const UserDiaryContainer: React.FC<DiaryContainerProps> = ({ diaryId, form, YYMM }) => {
  const router = useRouter();

  const toast = useToast();
  const modal = useModal();

  const queryClient = useQueryClient();

  const { setColor, setTags, setContent, setImg, setIsDiaryEditMode } = useZustandStore();
  const [stickers, setStickers] = useState<StickerType[]>([]);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [isTipVisible, setIsTipVisible] = useState(true);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const handleStickerSelect = (sticker: Omit<StickerType, 'position'>) => {
    setStickers([...stickers, { ...sticker, id: uuidv4(), position: { x: 130, y: 160 } }]);

    setIsPickerVisible(false);
  };

  const handlePositionChange = (id: string, position: { x: number; y: number }) => {
    setStickers((prevStickers) =>
      prevStickers.map((sticker) => (sticker.id === id ? { ...sticker, position } : sticker))
    );
  };

  const {
    data: diary,
    error: diaryError,
    isPending: isQueryLoading
  } = useQuery({
    queryKey: ['diaries', diaryId],
    queryFn: () => fetchDiary(diaryId)
  });

  const {
    data: queryStickers,
    error: stickerError,
    isPending: isStickersQueryLoading
  } = useQuery({
    queryKey: ['stickers', diaryId],
    queryFn: () => fetchStickers(diaryId)
  });

  useEffect(() => {
    if (queryStickers) {
      setStickers(queryStickers);
    }
  }, [queryStickers]);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/diaries/${diaryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      queryClient.invalidateQueries({ queryKey: ['diaries', diaryId] });
      toast.on({ label: '다이어리가 삭제되었습니다' });

      router.replace(`/?form=${form}&YYMM=${YYMM}`);
    },
    onError: (error: Error) => {
      console.error('Error deleting diary:', error);
      toast.on({ label: '다이어리삭제 에러' });
    }
  });

  const saveStickersMutation = useMutation({
    mutationFn: async ({ stickersToSave, diaryId }: { stickersToSave: StickerDataType[]; diaryId: string }) => {
      const response = await saveStickers(stickersToSave, diaryId);
      const responseMessage = response.message;
      return responseMessage;
    },
    onSuccess: (responseMessage) => {
      toast.on({ label: `${responseMessage}` });
      queryClient.invalidateQueries({ queryKey: ['stickers', diaryId] });
    },
    onError: (error) => {
      console.error('Error saving stickers:', error);
      toast.on({ label: '스티커 저장 중 오류 발생' });
    }
  });

  // 버튼 클릭 시 스티커 저장 뮤테이션 트리거
  const handleSaveStickers = () => {
    //스티커 문자열로 변환(저장준비)
    const stickersToSave = stickers.map((sticker) => ({
      ...sticker,
      component: sticker.component.type.displayName as string
    }));

    saveStickersMutation.mutate({ stickersToSave, diaryId });
  };

  if (isQueryLoading || isStickersQueryLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const diaryData = diary;

  if (diaryError) {
    return <p className="flex justify-center items-center h-screen">본인이 쓴 글이 아님</p>;
  }
  if (stickerError) {
    return <p className="flex justify-center items-center h-screen">스티커 가져오는거 에러</p>;
  }

  if (!diaryData) {
    return <p className="flex justify-center items-center h-screen">No diary found</p>;
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

  //다이어리 삭제 시 스티커가 있으면 스터커도 함께 삭제
  const confirmDelete = async (): Promise<void> => {
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error('Error deleting diary or stickers:', error);
      toast.on({ label: '삭제 중 오류가 발생했습니다.' });
    } finally {
      modal.close();
    }
  };

  const handleDelete = (): void => {
    modal.open({
      label: '내 기록을 삭제하면 다시 볼 수 없어요./정말 삭제하실건가요?',
      onConfirm: confirmDelete,
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
          {stickers?.map((sticker) => (
            <Sticker
              key={sticker.id}
              sticker={sticker}
              onDelete={(id: string) => setStickers(stickers.filter((s) => s.id !== id))}
              onPositionChange={handlePositionChange}
              isDeleteVisible={isDeleteVisible}
            />
          ))}
          <CircleUI />
          <div className="relative flex flex-col flex-start justify-center w-335px-row-m h-603px-col-m px-24px-row-m py-24px-col-m bg-white md:w-600px-row md:h-696px-col rounded-[32px] border border-[#E6D3BC] md:px-60px-row md:py-40px-col md:gap-40px-col">
            <div className="md:w-480px-row md:h-530px-col">
              <div className="flex justify-between">
                <div className="invisible md:visible">
                  <TextButton onClick={handleBackward}>뒤로가기</TextButton>
                </div>
                <div className="relative flex gap-12px-row-m md:gap-8px-row">
                  <button
                    onClick={() => {
                      setIsPickerVisible(true);
                      setIsDeleteVisible(true);
                    }}
                  >
                    <SmilePlusIcon />
                  </button>
                  {isTipVisible && (
                    <div
                      onClick={() => setIsTipVisible(false)}
                      className="absolute -top-12 -right-5 cursor-pointer z-50"
                    >
                      <TipBubble />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      handleSaveStickers();
                      setIsDeleteVisible(false);
                    }}
                  >
                    <SaveIcon />
                  </button>
                  <div />
                </div>
              </div>
              <div className="items-start justify-start ">
                <DiaryContent diary={diaryData} />
              </div>
            </div>
            <div className="flex justify-end gap-16px-row-m md:gap-16px-row">
              <Button onClick={handleEdit} icon={<PencilIcon />}>
                수정하기
              </Button>
              <Button onClick={handleDelete} priority="secondary" icon={<TrashBinIcon />}>
                삭제하기
              </Button>
            </div>
          </div>
        </div>

        {isPickerVisible && (
          <div
            className="absolute inset-0 flex items-center justify-center z-50 "
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className="relative rounded-[32px] bg-white border-2 border-[#E6D3BC] w-284px-row-m h-310px-col-m md:w-320px-row md:h-auto">
              <div className="flex justify-center border-b-2 border-[#E6D3BC] px-10px-row-m py-12px-col-m md:px-12px-col md:py-12px-col">
                <p className="text-14px-m md:text-16px">스티커 모음집</p>
                <SmilePlusIcon />
              </div>
              <div className="py-24px-col-m px-16px-row-m md:px-24px-row md:pt-40px-col justify-center">
                <StickerPicker onSelect={handleStickerSelect} />
              </div>
              <button onClick={() => setIsPickerVisible(false)} className=" absolute right-4 bottom-4 ">
                <XIconBlack />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDiaryContainer;
