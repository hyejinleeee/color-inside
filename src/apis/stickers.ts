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
