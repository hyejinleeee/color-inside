import axios from 'axios';
import StickerComponentMapper from '@/components/diary/StickerComponentMapper';
import { createClient } from '@/utils/supabase/client';

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

export const saveStickers = async (stickersToSave: StickerDataType[], diaryId: string) => {
  const supabase = createClient();
  // 스티커 존재 여부 확인
  const { data: existingStickerData, error: fetchError } = await supabase
    .from('diaryStickers')
    .select('id')
    .eq('diaryId', diaryId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  // 기존 스티커가 있으면 업데이트 또는 삭제 처리
  if (existingStickerData) {
    if (stickersToSave.length === 0) {
      await supabase.from('diaryStickers').delete().eq('id', existingStickerData.id);
      // toast.on({ label: '스티커가 삭제되었습니다' });
    } else {
      const { error: updateError } = await supabase
        .from('diaryStickers')
        .update({ stickersData: stickersToSave })
        .eq('id', existingStickerData.id);

      if (updateError) {
        throw updateError;
      }

      // toast.on({ label: '스티커가 업데이트 되었습니다' });
    }
  } else {
    // 새로 스티커 삽입
    if (stickersToSave.length === 0) {
      // toast.on({ label: '스티커를 선택해주세요' });
    } else {
      const { error: insertError } = await supabase.from('diaryStickers').insert({
        diaryId,
        stickersData: stickersToSave
      });

      if (insertError) {
        throw insertError;
      }

      // toast.on({ label: '스티커가 저장되었습니다' });
    }
  }
};
