import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

export const LinkText = ({
  children,
  to
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <Link className="group pl-2 text-xl flex items-center" href={to}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DC0FF] via-[#D478FF] to-[#FF41D5]">
        {children}
      </span>
      <span className="pb-1 group-hover:translate-x-3 ease-in duration-300">
        {' '}
        <FaAngleRight className="pt-1 text-2xl" />
      </span>
    </Link>
  );
};
