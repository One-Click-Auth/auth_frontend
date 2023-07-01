import React,{useEffect} from "react";
import { cn } from '@/lib/utils'
type ModalProps = {
  show: boolean;
  children: React.ReactNode;
  onHide?:() => void,
  className?:string
};

function Modal({ show, children,onHide,className}: ModalProps) {
  useEffect(() => {
    if(!show)
    if(onHide) onHide()
  },[show])
  return (
    <>
      {show && (
        <div className={cn("flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/70",className)}>
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;
