import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 스티커 가져오기
export const GET = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const supabase = createClient();
  const diaryId = params.id;

  if (!diaryId) {
    return NextResponse.json({ error: 'Diary ID is required!!!' }, { status: 400 });
  }

  try {
    // 인증된 사용자 정보 가져오기
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 스티커 데이터 가져오기
    const { data } = await supabase.from('diaryStickers').select('stickersData').eq('diaryId', diaryId).single();

    // 스티커가 없을 때 빈 배열 반환
    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    // 스티커 데이터 처리
    const stickersData = Array.isArray(data.stickersData) ? data.stickersData : [];

    return NextResponse.json(stickersData, { status: 200 });
  } catch (error) {
    console.error('Server Error processing GET request:', error);
    return NextResponse.json({ error: 'Server Error: Unable to process GET request' }, { status: 500 });
  }
};
