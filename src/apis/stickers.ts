import axios from 'axios';
import StickerComponentMapper from '@/components/diary/StickerComponentMapper';

type StickerDataType = {
  id: string;
  component: string;
  position: { x: number; y: number };
};

export const fetchStickers = async (id: string) => {
  try {
    const response = await axios.get(`/api/stickers/${id}`);

    // 응답 데이터가 없거나 비어 있을 경우 빈 배열 반환
    if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
      return []; // 스티커가 없을 때 빈 배열 반환
    }
    if (response.data && Array.isArray(response.data)) {
      const stickersFromDB = response.data.map((sticker: StickerDataType) => ({
        ...sticker,
        component: StickerComponentMapper[sticker.component as keyof typeof StickerComponentMapper] || null
      }));

      return stickersFromDB; // 변환된 스티커 데이터 반환
    }

    throw new Error('Invalid response format'); // 유효하지 않은 응답 처리
  } catch (error) {
    console.error('axios 스티커패칭 오류:', error);
    throw error;
  }
};

//스티커 저장
export const saveStickers = async (stickersToSave: StickerDataType[], diaryId: string) => {
  try {
    if (stickersToSave.length) {
      // 스티커가 있는 경우 - 업데이트 또는 생성
      const response = await axios.put(`/api/stickers/${diaryId}`, {
        stickersToSave // 스티커 데이터를 함께 전달
      });
      return response.data;
    } else {
      // 스티커가 없는 경우 - 삭제
      const response = await axios.delete(`/api/stickers/${diaryId}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error saving stickers:', error);
    throw error;
  }
};
