import WriteForm from '@/components/diary/WriteForm';
import { isValidDate } from '@/utils/paramsValidation';
import { notFound } from 'next/navigation';

export default function WritePage({ params }: { params: { date: string } }) {
  if (!isValidDate(params.date)) {
    notFound();
  }

  return <WriteForm />;
}
