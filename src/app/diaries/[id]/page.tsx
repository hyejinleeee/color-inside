import ConditionalDiary from '@/components/diary/ConditionalDiary';
import { isValidUUID } from '@/utils/paramsValidation';
import { notFound } from 'next/navigation';

const DiaryPage = ({ params }: { params: { id: string } }) => {
  if (!isValidUUID(params.id)) {
    notFound();
  }

  return <ConditionalDiary />;
};

export default DiaryPage;
