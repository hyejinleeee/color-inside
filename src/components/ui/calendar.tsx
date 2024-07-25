'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Stamp from '../Stamp';
import { useRouter } from 'next/navigation';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, diaryList, ...props }: CalendarProps) {
  const [DD, setDD] = React.useState('');
  const route = useRouter();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        DayContent: ({ ...props }) => {
          const handleFindDiary = (diary) => {
            //console.log(new Date(diary.date).getDate() === new Date(props.date).getDate());

            if (new Date(diary.date).getDate() === new Date(props.date).getDate()) {
              return diary;
            } else {
              return false;
            }
          };
          return diaryList.find(handleFindDiary) ? (
            <div>O</div>
          ) : (
            <div>
              <Stamp color={'#64afe5ad'} />
            </div>
          );
          //console.log(diaryList.find(handleFindDiary));
          //console.log(new Date(props.date).getDate(), 'day', diaryList.find(handleFindDiary));
        }
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

// const handleFindDiary = (arrDiary) => {
//
//     ? return <div className="flex flex-col items-center">
//           <FlowerStamp color={arrDiary.color} />
//           <p className="font-bold">{props.date.getDate()}</p>
//         </div>
//     : dayList.push(
//         <div className="flex flex-col items-center">
//           <FlowerStamp color="#FFF" />
//           <p className="font-bold">{props.date.getDate()}</p>
//         </div>
//       );
// };
// ;
