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

    if (response.data && Array.isArray(response.data)) {
      const stickersFromDB = response.data.map((sticker: StickerDataType) => ({
        ...sticker,
        component: StickerComponentMapper[sticker.component as keyof typeof StickerComponentMapper] || null
      }));

      return stickersFromDB; // 변환된 스티커 데이터 반환
    }

    throw new Error('Invalid response format'); // 유효하지 않은 응답 처리
  } catch (error) {
    console.error('Error fetching stickers:', error);
    throw error; // 에러를 호출자에게 전달
  }
};
