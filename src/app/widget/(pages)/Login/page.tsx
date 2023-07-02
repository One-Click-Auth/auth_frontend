"use client";
import { FormButton } from "@/components/authForm/FormButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import React from "react";

const Login = () => {
  const handleSubmit = () => {};
  return (
    <div className="w-full flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/5">
      <Card className="w-full">
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center">
          <div>
            <label
              htmlFor="email"
              className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2`}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              className={`form-control  px-8 py-3 border rounded-lg  border-slate-500 outline-none}`}
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group">
            <div className="d-grid start">
              <FormButton>Next</FormButton>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
