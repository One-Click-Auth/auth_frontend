'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { RadioGroup } from './components/Radiogroup';
import Spinner from '@/components/spinner';
import axios, { AxiosError, AxiosResponse } from 'axios';

function Page() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSendingGenerateRequest, setIsSendingGenerateRequest] =
    useState(false);
  const [isUploadingToS3, setIsUploadingToS3] = useState(false);
  const [apiURL, setApiURL] = useState(
    'https://api-inference.huggingface.co/models/moonlightnexus/RealityCreation'
  );
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [imageURL, setImageURL] = useState('');

  async function handleImageUploadToS3() {
    // Check filename extension
    try {
      if (!imageURL || !blob) return;

      // Fetch Upload url
      const response = await fetch(
        `/api/preSignedUrl?fileName=${imageURL}.jpeg`
      ).catch(err => console.log(err));
      const data = await response?.json();
      const { url } = data as { url: string };

      // PUT file to s3 bucket
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/*'
        },
        body: blob
      }).catch(err => {
        setIsUploadingToS3(false);
        console.log(err);
      });

      console.log({ url });
    } catch (error) {
      setIsUploadingToS3(false);
    }
  }

  // recursively try to generate image
  async function handleImageGenerateAPI(
    inputs: string
  ): Promise<AxiosResponse | null> {
    const API_TOKEN = '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';
    const headers = { Authorization: `Bearer ${API_TOKEN}` };

    try {
      return await axios.post(
        apiURL,
        { inputs },
        {
          headers: headers,
          responseType: 'arraybuffer'
        }
      );
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 503) {
        await new Promise(resolve => setTimeout(resolve, 7000)); // Introduce a delay between retries
        return handleImageGenerateAPI(inputs);
      } else {
        console.log(err);
        return null;
      }
    }
  }

  async function handleImageGeneration() {
    const inputs = inputRef?.current?.value;

    if (!inputs) return;

    setIsSendingGenerateRequest(true);

    const response = await handleImageGenerateAPI(inputs);

    if (!response) {
      setIsSendingGenerateRequest(false);
      return;
    }

    setBlob(new Blob([response.data], { type: 'image/jpeg' }));
    const img = URL.createObjectURL(blob);

    setImageURL(img);
    setIsSendingGenerateRequest(false);
  }

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

      <div className="flex-col flex justify-between  flex-1 px-10 py-6 border rounded-lg   items-center">
        <div className="flex flex-col gap-3">
          <Icon />
          <div className="GenerativeAiImagesCarousel text-black text-2xl font-medium">
            Generative Ai Images Carousel
          </div>

          <div
            className="border-dashed border-2
           border-[#9747FF] p-7 rounded-lg"
          >
            <RadioGroup setApiURL={setApiURL} apiURL={apiURL} />
          </div>

          <div className=" flex flex-col mt-14 gap-11">
            <form
              className="flex  items-center  gap-4"
              onSubmit={e => {
                e.preventDefault();
                handleImageGeneration();
              }}
            >
              <Button
                className={`showcase-1-btn  flex w-[200px] !h-[45px]  items-center gap-3 text-lg rounded-lg pr-8 font-semibold text-white ${
                  isSendingGenerateRequest ? 'cursor-not-allowed' : ''
                }}`}
                type="submit"
              >
                {isSendingGenerateRequest ? (
                  <Spinner color="white" size={30} />
                ) : (
                  <>
                    <GradientAISvg /> Generate
                  </>
                )}
              </Button>

              <Input
                className="p-3 px-10  w-full !h-[45px]"
                placeholder="pile of white rubik cubes in a red room, wes anderson style
"
                ref={inputRef}
              />
            </form>

            <div className="flex  lg:flex-row flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div
                  className="  flex border border-black rounded-lg
               w-[200px] !h-[45px]  items-center justify-center text-lg  "
                >
                  Output
                </div>

                <Button
                  variant="authx"
                  className="  flex
               w-[200px] !h-[45px]  items-center gap-3 text-lg  "
                  onClick={handleImageUploadToS3}
                >
                  {isUploadingToS3 ? (
                    <Spinner color="white" size={30} />
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>

              <div>
                <Image
                  src={imageURL || '/magic.svg'}
                  alt="magic-ai"
                  width={500}
                  height={400}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
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
function GradientAISvg() {
  return (
    <div className="flex" items-center>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
      >
        <path
          d="M1.13362 10.396C0.983776 10.276 0.943937 10.0661 1.024 9.89167C1.27927 9.33562 1.4523 8.66551 1.54298 7.88147C1.65715 6.94415 1.56989 5.92029 1.28142 4.80961C1.03488 3.83823 0.66816 3.01684 0.181419 2.34569C0.0660231 2.18666 0.0631317 1.96923 0.185828 1.81595C0.306154 1.66562 0.513595 1.61903 0.691154 1.69348C1.44303 2.00855 2.25965 2.19672 3.14104 2.2581C4.15586 2.32596 5.13606 2.21731 6.08176 1.93213C6.92141 1.67584 7.63484 1.32881 8.22204 0.890782C8.37594 0.776142 8.58875 0.771818 8.73853 0.891703C8.89003 1.01297 8.9315 1.22468 8.85072 1.40112C8.66841 1.79954 8.52669 2.24322 8.42559 2.73228C8.30495 3.33948 8.25945 3.97971 8.28891 4.65304C8.33329 5.32466 8.44871 5.99223 8.63494 6.65559C8.88213 7.51789 9.23516 8.26731 9.69416 8.90383C9.80673 9.06003 9.80849 9.27294 9.68822 9.4232C9.56608 9.5758 9.35395 9.6192 9.17456 9.54182C8.71824 9.3449 8.20064 9.2021 7.62194 9.11331C6.91899 9.01082 6.20613 8.9883 5.48332 9.04583C4.76714 9.09522 4.10865 9.22456 3.50797 9.43397C2.76132 9.69476 2.14206 10.0139 1.65035 10.3917C1.49773 10.5088 1.28374 10.5161 1.13362 10.396Z"
          fill="url(#paint0_radial_199_2274)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_199_2274"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(8.72586 9.27697) rotate(-139.507) scale(11.8037)"
          >
            <stop stop-color="#9EFF00" />
            <stop offset="0.319445" stop-color="#26B4E1" />
            <stop offset="0.621528" stop-color="#AE75DB" stop-opacity="0.91" />
            <stop offset="0.621628" stop-color="#B176D5" />
            <stop offset="0.939236" stop-color="#FF9228" />
          </radialGradient>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
      >
        <path
          d="M26.8071 13.5117C26.8071 13.9343 26.501 14.2917 26.091 14.3941C24.7838 14.7204 23.3937 15.345 21.9211 16.268C20.1527 17.3614 18.5127 18.9203 17.0002 20.9445C15.6696 22.705 14.7622 24.4656 14.2781 26.2259C14.1636 26.6431 13.7937 26.9473 13.3614 26.9473C12.9374 26.9473 12.5719 26.6548 12.4555 26.2471C11.9626 24.521 11.1624 22.8582 10.0551 21.2586C8.77534 19.4206 7.23979 17.8851 5.44825 16.6517C3.8523 15.561 2.27402 14.812 0.713025 14.4053C0.304179 14.2985 0.00390625 13.9386 0.00390625 13.5162C0.00390625 13.0889 0.310783 12.7262 0.725261 12.6223C1.66104 12.3875 2.61877 12.0206 3.59864 11.5215C4.80847 10.8933 5.97169 10.0906 7.08868 9.11345C8.18217 8.11299 9.17098 6.996 10.0551 5.76305C11.1973 4.15156 11.9999 2.51346 12.4625 0.848557C12.5761 0.4401 12.9397 0.144098 13.3635 0.144098C13.7939 0.144098 14.1604 0.449034 14.2743 0.863899C14.5637 1.91932 15.0304 3.00563 15.674 4.12262C16.4651 5.4721 17.4073 6.72855 18.5008 7.89196C19.5712 9.05518 20.6996 10.0092 21.8862 10.7537C23.3619 11.6784 24.7627 12.3038 26.0886 12.6293C26.5 12.7305 26.8071 13.0883 26.8071 13.5117Z"
          fill="url(#paint0_radial_199_2273)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_199_2273"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(14.4364 1.9997) rotate(91.8183) scale(25.9915)"
          >
            <stop stop-color="#9EFF00" />
            <stop offset="0.319445" stop-color="#26B4E1" />
            <stop offset="0.621528" stop-color="#AE75DB" />
            <stop offset="0.939236" stop-color="#FF9228" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Page;
