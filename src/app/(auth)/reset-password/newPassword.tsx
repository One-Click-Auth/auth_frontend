"use client"
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

import Modal from "./otpModal";
import image from './group.svg';
import logo from './logo.svg'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const NewPassword: React.FC = () => {

  const searchparams = useSearchParams();
  const email = searchparams.get("email");
  const [pass, setPass] = useState("");
  const [add, setAdd] = useState("");
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    // console.log(email, pass);
    fetch("https://api.trustauthx.com/forgot/Signup", {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: pass,
        is_pool: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.is_ok == true && data.status === 200) {
          // console.log(data.msg);
          setAdd(data.msg);
          console.log(add)
          handleModal();
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col  md:flex-row h-screen w-screen">

      <div className="flex flex-col justify-center items-center h-full w-full md:w-3/5 my-20 md:my-0">
        <div className='absolute top-4 left-4 md:top-8 md:left-8 w-10 md:w-20' ><Image width="100" height="100" src={logo} alt="logo" /></div>
        <div className="w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/2">
          <h2 className="text-left text-2xl md:text-4xl mb-4 font-semibold">Reset Password</h2>
        </div>

        <form className="flex flex-col w-full items-center justify-center text-left" onSubmit={handleForm}>

          <div className="relative w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/2 my-4 flex items-center">
            <input type="password" id="password" placeholder="xxxxxxxxx" className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-2" onChange={(e) => setPass(e.target.value)} />
            <label htmlFor="password" className="absolute translate-x-5 translate-y-[-29px] bg-white text-xl" >New Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-spl-primary py-2 px-4 w-[90vw] sm:w-3/4 md:w-1/2 lg:w-1/2 mb-4  btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
          >
            <span>Next</span>
            <span className="forward-arr">
              {" "}
              <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
            </span>
          </button>
        </form>
        <div className="ats-content mt-4 md:mt-11 mx-auto text-center md:text-left ">
          <p className="mb-0 text-xl flex items-center justify-center flex-wrap">
            I remember AuthX password &nbsp;
            <Link
              className="a-t-s a-link text-xl flex items-center"
              href="/"
            >
              advance to Login{" "}
              <span className="forward-arr arr-black">
                {" "}
                <FaAngleRight className="pt-1 text-2xl" />
              </span>
            </Link>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-2/5  md:mt-0 bg-black text-white">
        <p className="text-2xl md:text-3xl my-5 mx-auto text-center md:text-left">
          AuthX: Ensure Security at every level
        </p>
        <Image src={image} alt="Flitchcoin" className="w-72" width="72" />
        <div className='w-full  pb-8 text-right px-3'>
          <span>© 2023 TrustAuthx. All rights reserved.</span>
        </div>
      </div>

      {show && <Modal handleForm={handleForm} add={add} />}
    </div>
  );
};

export default NewPassword;
