import { MdEmail } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { useOrgData } from '../widgetStore'; //import zustand store to store and update org data
import { cn } from '@/lib/utils';
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
      <div className="flex items-center justify-center flex-col gap-4">
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
        <p className=" w-full break-words text-center " style={orgNameStyle}>
          {email}
        </p>
      </div>

      <div className="flex flex-col ">
        <p
          style={greetingStyle}
          className={`relative text-center text-xl w-full mt-10 msg`}
        >
          {message}
        </p>
        <div className="flex items-center justify-center flex-col my-10">
          <span className="relative ">
            {/* <FaPaperPlane style={{color:`${widget.input_border.color}`}} size={20} className='relative  -right-6'/> */}
            <MdEmail
              style={{
                color: ` ${widget.input_border.color}`
              }}
              size={50}
              className="opacity-80  "
            />
          </span>
        </div>
      </div>
    </div>
  );
}
