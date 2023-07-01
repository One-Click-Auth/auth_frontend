import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { createRipple } from "@/helper/createRipple";

type PasswordSubmitType = {
  handlePasswordSubmit: (e: string) => void;
};

export const PasswordComponent = ({
  handlePasswordSubmit,
}: PasswordSubmitType) => {
  const [password, setPassword] = useState('')
  const [error,setError] = useState('')
  return (
    <div >
        <div className="form-group relative">
          <label
            htmlFor="password"
            className="form-label absolute translate-x-6 translate-y-[-12px] bg-white px-1"
          >
            Password 
          </label>
          <input
            id="password"
            type="password"
            defaultValue={password}
          required
          className="w-full rounded-xl"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            placeholder="Enter password"
          />
          {error && (
            <div className=" color text-red-600">
            <span>{error}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="d-grid start">
            <button
              type="submit"
            onClick={(e) => {
              createRipple(e)
              if(password)
                handlePasswordSubmit(password)
              else setError('Password is required')
            }}
              className="ripple-button btn btn-spl-primary mt-8 md:mt-11 btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
            >
              <span>Next</span>
              <span className="forward-arr">
                {" "}
                <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
              </span>
            </button>
          </div>
        </div>

        <div className="ats-content mt-8 md:mt-11">
          <p className="mb-0 text-xl flex items-center flex-wrap">
            Forgot Password?
            <Link
              className="pl-2 a-t-s a-link text-xl flex items-center"
              href="/reset-password"
            >
              advance to reset Password{" "}
              <span className="forward-arr arr-black">
                {" "}
                <FaAngleRight className="pt-1 text-2xl" />
              </span>
            </Link>
          </p>
        </div>
    </div>
  );
};
