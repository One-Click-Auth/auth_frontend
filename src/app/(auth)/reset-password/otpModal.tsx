import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
interface ModalProps {
  handleForm: (e: React.MouseEvent<HTMLSpanElement>) => void;
  add: string;
}

const Modal: React.FC<ModalProps> = ({ handleForm, add }) => {
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(false);
    if (otp.length === 8) {
      handleOTPForm();
    }
  }, [otp]);

  const handleOTPForm = () => {
    console.log(otp, add);
    fetch('https://api.trustauthx.com/forgot/verify_email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        otp,
        add: add,
        types: 'string'
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200 && data.is_ok === true) {
          router.push('/');
        }
        if (data.detail) {
          setShow(true);
          console.log(data.detail);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      <div className="absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] bg-white flex flex-col justify-center items-center p-8 w-[90vw] sm:w-3/4 md:w-1/2 lg:1/3 rounded-lg z-20 ">
        <p className="text-sm mx-auto text-center md:text-left">
          Please check your email for a reset password OTP. You can reset
          password <span className="text-blue-400">by entering OTP</span> in the
          designated column. If you didn't receive an email, click I didn't
          receive email
        </p>
        <h2 className="text-2xl m-4">Enter e-mail OTP</h2>

        <OtpInput
          containerStyle="grid grid-cols-2 justify-center gap-1 md:gap-2"
          inputStyle="!w-8 md:!w-12 border border-slate-500 sm:h-9 md:h-12 p-0 text-center rounded-xl"
          value={otp}
          onChange={setOtp}
          numInputs={8}
          renderSeparator={<span></span>}
          renderInput={props => <input {...props} />}
        />

        {show ? <p className="text-red-500 pt-2">Invalid OTP</p> : ''}
        <div className="flex w-full mt-9">
          <span
            className="cursor-pointer  text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 "
            onClick={handleForm}
          >
            I didn't receive Email &gt;
          </span>
        </div>
      </div>
    </>
  );
};

export default Modal;
