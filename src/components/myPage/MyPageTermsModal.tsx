import terms from '@/data/terms';
import Button from '../common/Button';

interface TermsModalProps {

  onClose: () => void;
}

const MyPageTermsModal = ({ onClose }: TermsModalProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-32px-col px-96px-row py-72px-col rounded-5xl bg-sign-up border-4 border-border-color">
      <h1 className="text-font-color text-24px font-bold tracking-0.48px">Color Inside 서비스 이용약관</h1>
      <div className="w-540px-row h-560px-col overflow-y-scroll small-custom-terms-scrollbar">{terms}</div>
      <div className="w-full flex items-end justify-end self-stretch gap-16px-row">
        <Button
          size={'lg'}
          onClick={onClose}
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="icon/X">
              <path id="Vector" d="M4.9068 5.05908L4.9752 4.97508C5.07463 4.87587 5.20571 4.81468 5.34561 4.80219C5.48551 4.78969 5.62536 4.82667 5.7408 4.90668L5.8248 4.97508L12 11.1515L18.1752 4.97508C18.2746 4.87587 18.4057 4.81468 18.5456 4.80219C18.6855 4.78969 18.8254 4.82667 18.9408 4.90668L19.0248 4.97508C19.124 5.07451 19.1852 5.20559 19.1977 5.34549C19.2102 5.48539 19.1732 5.62524 19.0932 5.74068L19.0248 5.82468L12.8484 11.9999L19.0248 18.1751C19.124 18.2745 19.1852 18.4056 19.1977 18.5455C19.2102 18.6854 19.1732 18.8252 19.0932 18.9407L19.0248 19.0247C18.9254 19.1239 18.7943 19.1851 18.6544 19.1976C18.5145 19.2101 18.3746 19.1731 18.2592 19.0931L18.1752 19.0247L12 12.8483L5.8248 19.0247C5.72537 19.1239 5.59429 19.1851 5.45439 19.1976C5.31449 19.2101 5.17464 19.1731 5.0592 19.0931L4.9752 19.0247C4.87599 18.9253 4.81481 18.7942 4.80231 18.6543C4.78981 18.5144 4.82679 18.3745 4.9068 18.2591L4.9752 18.1751L11.1516 11.9999L4.9752 5.82468C4.87599 5.72525 4.81481 5.59417 4.80231 5.45427C4.78981 5.31437 4.82679 5.17452 4.9068 5.05908Z" fill="white" />
            </g>
          </svg>
          }
        >
          이용약관 닫기
        </Button>
      </div>
    </div>
  );
};

export default MyPageTermsModal;
