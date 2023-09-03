import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/slider';
import React from 'react';

function Page() {
  return (
    <div className="flex flex-col mt-12 justify-center items-center gap-11">
      <div className="flex justify-between flex-1 px-10 py-6 border rounded-lg  gap-28 items-center">
        <div>
          <div className=" text-black text-2xl font-medium">Use AI Images</div>
          <div className=" max-w-[750px]  text-zinc-500 text-base font-normal">
            Implement robust bot detection mechanisms within your Authx-powered
            platform to identify and mitigate the activities of malicious bots,
            ensuring a secure and reliable user experience for legitimate users.
          </div>
        </div>

        <Switch />
      </div>

      <div className="flex-col flex justify-between flex-1 px-10 py-6 border rounded-lg   items-center">
        <div className="flex flex-col gap-3">
          <Icon />
          <div className="GenerativeAiImagesCarousel text-black text-2xl font-medium">
            Generative Ai Images Carousel
          </div>

          <div className="border-dashed border-2 border-[#9747FF]"></div>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="29"
      viewBox="0 0 36 29"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.5 2.25V15.875C0.5 17.5319 1.84315 18.875 3.5 18.875H15.875H29.75V2.25C29.75 1.00736 28.7426 0 27.5 0H2.75C1.50736 0 0.5 1.00736 0.5 2.25ZM6.25 4C5.2835 4 4.5 4.7835 4.5 5.75C4.5 6.7165 5.2835 7.5 6.25 7.5C6.41283 7.5 6.5805 7.5 6.74997 7.5C7.71647 7.5 8.5 5.779 8.5 4.8125C8.5 3.846 7.7165 4 6.75 4H6.25Z"
        fill="#9EFF00"
      />
      <path
        d="M12.1513 17.8658C10.7829 17.6237 10.7829 15.6262 12.1513 15.3842C17.0915 14.5102 21.0242 10.6942 22.1164 5.7213C22.1482 5.57634 22.179 5.43113 22.2102 5.28604C22.5062 3.91082 24.4319 3.90227 24.7398 5.2748C24.7791 5.44998 24.8175 5.62539 24.8579 5.80032C25.9976 10.7364 29.926 14.5079 34.8435 15.3778C36.2188 15.6212 36.2188 17.6288 34.8435 17.8722C29.8998 18.7467 25.9558 22.5539 24.8399 27.5287L24.7398 27.9752C24.4319 29.3477 22.5062 29.3392 22.2102 27.964L22.1277 27.5808C21.0517 22.5825 17.1087 18.7428 12.1513 17.8658Z"
        fill="black"
      />
    </svg>
  );
}

export default Page;
