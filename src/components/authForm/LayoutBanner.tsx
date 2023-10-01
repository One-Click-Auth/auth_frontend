import Image from 'next/image';

export default function LayoutBanner({
  bannerText,
  src
}: {
  bannerText: string;
  src: string;
}) {
  return (
    <div className="bg-black min-h-screen w-full sm:basis-2/5 relative flex flex-col justify-center">
      <div className="flex flex-col items-center my-10 md:mt-12">
        <h1 className="text-3xl xl:text-4xl mx-4 text-white max-w-lg tracking-widest font-light text-center">
          {bannerText}
        </h1>
        <Image
          className="mt-8 md:mt-10 xl:mt-12 w-3/5 max-h-[65vh]"
          src={src}
          alt="AuthX pre login"
          width={240}
          height={400}
        />
      </div>
      <span className="text-white w-full text-center absolute bottom-0 right-0 mb-4 xl:mb-8">
        © 2023 TrustAuthx. All rights reserved.
      </span>
    </div>
  );
}
