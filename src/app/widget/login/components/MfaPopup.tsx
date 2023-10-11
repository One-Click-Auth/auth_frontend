import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import OtpInput from 'react-otp-input';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/spinner';
import { useOrgData } from '../widgetStore'; //import zustand store to store and update org data
import WidgetButton from './WidgetButton';

type MfaProps = {
  email: string;
  loading: boolean;
  handleMfaActions: (e: { preventDefault: () => void }) => void;
  otp: string; // Assuming otp is a string, you can change the type accordingly
  setOtp: (otp: string) => void;
};

export default function MfaPopup({
  email,
  loading,
  handleMfaActions,
  otp,
  setOtp
}: MfaProps) {
  const storeOrgData = useOrgData(state => state.data);
  const widget = storeOrgData.widget;
  const goButtonStyle = {
    color: widget.color9,
    background: `linear-gradient(to right, ${widget.color0} 0%,${widget.color1} 50%,${widget.color2} 100% )`,
    border: `${widget.button.width}px solid`,
    borderRadius: `${widget.button.radius}px`,
    borderColor: widget.button.bc
  };

  const orgNameStyle = {
    color: `${widget.color10}`
  };
  const greetingStyle = {
    color: `${widget.color11}`
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-col gap-4 ">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-3xl font-medium   text-center break-words"
          style={greetingStyle}
        >
          Hi !
        </h1>
        <p className=" w-full break-words text-center" style={orgNameStyle}>
          {email}
        </p>
      </div>

      <form
        className="flex flex-col justify-center items-center gap-12 mt-10  "
        onSubmit={handleMfaActions}
      >
        <p className="text-center text-[18.4px]" style={greetingStyle}>
          Enter OTP to Continue
        </p>

        <OtpInput
          containerStyle="grid justify-center gap-1  w-full"
          inputStyle={`!w-10 h-10 bg-transparent rounded-sm text-black  border-[1.7px] border-slate-500 ring-1 focus-visible:border-white ring-white focus-visible:outline-none  focus-visible:ring-blue-400  `}
          value={otp}
          onChange={setOtp}
          inputType="tel"
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={props => <input {...props} />}
        />

        <WidgetButton loading={loading} />
      </form>
    </div>
  );
}
