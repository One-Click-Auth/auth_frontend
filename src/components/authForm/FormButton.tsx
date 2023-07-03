import { FaAngleRight } from "react-icons/fa";
import { createRipple } from "@/helper/createRipple";

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      onClick={createRipple}
      type="submit"
      className="group relative overflow-hidden w-full text-white hover:shadow-lg rounded-lg mt-8 py-3 md:mt-11 btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
    >
      <span className="text-2xl font-semibold tracking-[0.25em]">{children}</span>
      <span className="group-hover:translate-x-3 ease-in duration-300">
        {" "}
        <FaAngleRight className="text-2xl mt-[2px]" />
      </span>
    </button>
  );
};
