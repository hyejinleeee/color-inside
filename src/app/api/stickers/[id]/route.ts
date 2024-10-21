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
    if (!data || !data.stickersData || !Array.isArray(data.stickersData)) {
      return NextResponse.json([], { status: 200 });
    }
    console.log('드디어?', data);
    // 스티커 데이터 처리
    const stickersData = data.stickersData;

    return NextResponse.json(stickersData, { status: 200 });
  } catch (error) {
    console.error('Server Error processing GET request:', error);
    return NextResponse.json({ error: 'Server Error: Unable to process GET request' }, { status: 500 });
  }
};

// PUT 요청: 스티커가 없으면 생성, 있으면 업데이트
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const supabase = createClient();
  const diaryId = params.id;
  const stickersData = await request.json(); // 클라이언트에서 보낸 스티커 데이터
  console.log('아 저장하기 힘드네', stickersData);
  // 스티커 존재 여부 확인
  const { data: existingStickerData, error: fetchError } = await supabase
    .from('diaryStickers')
    .select('id')
    .eq('diaryId', diaryId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // 데이터베이스 에러 처리
    return NextResponse.json({ error: 'Failed to fetch sticker data' }, { status: 500 });
  }

  if (existingStickerData) {
    // 스티커가 있으면 업데이트
    const { error: updateError } = await supabase
      .from('diaryStickers')
      .update({ stickersData }) // 업데이트할 데이터
      .eq('diaryId', diaryId);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update sticker data' }, { status: 500 });
    }

    return NextResponse.json({ message: '스티커가 업데이트 되었습니다' }, { status: 200 });
  } else {
    // 스티커가 없으면 생성
    const { error: insertError } = await supabase.from('diaryStickers').insert({ diaryId, stickersData });

    if (insertError) {
      return NextResponse.json({ error: 'Failed to insert sticker data' }, { status: 500 });
    }

    return NextResponse.json({ message: '스티커가 추가 되었습니다' }, { status: 201 });
  }
};

// DELETE 요청: 스티커가 있으면 삭제
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const supabase = createClient();
  const diaryId = params.id;

  // 스티커 존재 여부 확인
  const { data: existingStickerData, error: fetchError } = await supabase
    .from('diaryStickers')
    .select('id')
    .eq('diaryId', diaryId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // 데이터베이스 에러 처리
    return NextResponse.json({ error: 'Failed to fetch sticker data' }, { status: 500 });
  }

  if (existingStickerData) {
    // 스티커가 있으면 삭제
    const { error: deleteError } = await supabase.from('diaryStickers').delete().eq('diaryId', diaryId);

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete sticker data' }, { status: 500 });
    }

    return NextResponse.json({ message: '스티커가 삭제되었습니다' }, { status: 200 });
  } else {
    // 스티커가 없을 때
    return NextResponse.json({ message: '스티커를 추가해주세요' }, { status: 200 });
  }
};
