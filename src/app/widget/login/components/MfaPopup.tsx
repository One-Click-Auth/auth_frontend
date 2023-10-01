import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import OtpInput from 'react-otp-input';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/spinner';
import { useOrgData } from '../widgetStore'; //import zustand store to store and update org data

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

  const otpInputStyle = {
    borderRadius: '0.75rem',
    border: '1.3px solid',
    borderColor: ` ${widget.input_border.color}`,
    // border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500
    background: 'transparent',
    height: '2.5rem',
    width: '2.5rem'
  };

  return (
    <div className="flex flex-col gap-8  ">
      <div className="flex items-center justify-center flex-col lg:px-4 gap-6">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
        <h1
          className="text-3xl font-medium   text-center break-words w-44 mt-0.5 "
          style={greetingStyle}
        >
          Hi !
        </h1>
        <p className=" w-full break-words text-center" style={orgNameStyle}>
          {email}
        </p>
      </div>

      <form
        className="flex flex-col justify-center items-center mt-6 gap-8 "
        onSubmit={handleMfaActions}
      >
        <p className="text-center ">Enter OTP to Continue</p>

        <OtpInput
          containerStyle="grid justify-center gap-1 sm:gap-[0.32rem] w-full"
          inputStyle={otpInputStyle}
          value={otp}
          onChange={setOtp}
          inputType="tel"
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={props => <input {...props} />}
        />

        <Button
          style={goButtonStyle}
          className="w-full h-[2.8rem] mb-4"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <div>
              <Spinner size={20} color={widget.color9} />
            </div>
          ) : (
            <span>Continue</span>
          )}
        </Button>
      </form>
    </div>
  );
}
