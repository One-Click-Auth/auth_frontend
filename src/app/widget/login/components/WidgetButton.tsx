import { useOrgData } from '../widgetStore';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/spinner';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
  loading: boolean;
  disabled?: boolean;
};
export default function WidgetButton({ loading, disabled }: Props) {
  const storeOrgData = useOrgData(state => state.data);

  const widget = storeOrgData.widget;
  const goButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    border: `${widget.button.width}px solid`,
    borderRadius: `${widget.button.radius}px`,
    borderColor: widget.button.bc
  };
  return (
    <Button
      style={goButtonStyle}
      className="w-full h-[2.8rem] group shadow-none  gap-1"
      disabled={loading || disabled}
      type="submit"
    >
      {loading ? (
        <div>
          <Spinner size={20} color={widget.color9} />
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <span>Continue</span>
          <IoIosArrowForward
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      )}
    </Button>
  );
}
