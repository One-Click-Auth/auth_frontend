import { MdEmail } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { useOrgData } from '../widgetStore'; //import zustand store to store and update org data

type MessageProp = { message: string; email: string };
export default function MessagePanel({ message, email }: MessageProp) {
  const storeOrgData = useOrgData(state => state.data);
  const widget = storeOrgData.widget;

  const orgNameStyle = {
    color: `${widget.color10}`
  };
  const greetingStyle = {
    color: `${widget.color11}`
  };

  return (
    <div>
      <div className="w-full relative  flex mb-4 items-center justify-center">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage
            src={widget.logo_url}
            width={80}
            alt="Organisation Logo"
          />
          <AvatarFallback delayMs={1000}>LOGO</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-8  ">
        <div className="flex items-center justify-center flex-col lg:px-4 gap-8">
          <h1
            className="text-3xl font-medium   text-center break-words w-44 mt-0.5 "
            style={greetingStyle}
          >
            Hi !
          </h1>
          <p className="w-full break-words text-center" style={orgNameStyle}>
            {email}
          </p>
          <span className="relative">
            {/* <FaPaperPlane style={{color:`${widget.input_border.color}`}} size={20} className='relative  -right-6'/> */}
            <MdEmail
              style={{
                color: ` ${widget.input_border.color}`
              }}
              size={50}
            />
          </span>
        </div>

        <div className="h-[1px] w-full bg-muted-foreground my-6" />

        <div className="flex flex-col items-center gap-8 ">
          <p
            className="relative text-center text-lg w-full py-2"
            style={{ color: widget.color11 }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
