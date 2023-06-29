"use client"

import React from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { CopyPasteSvg } from "../assets/Svg/Account/Account";
import { CheckSquareValid } from "../assets/Svg/Account/Account";

function InputWithButtons() {
  return (
    <div className="flex w-full items-center space-x-2 tracking-wide">
      <Input className="border mr-0" type="text" />
      <Button
        className="bg-accent hover:bg-accent/80 text-black tracking-wide py-2 px-4"
        type="button"
      >
        Reveal
      </Button>
      <Button
        className="bg-accent hover:bg-accent/80 text-black tracking-wide py-2 px-4"
        type="button"
      >
        <CopyPasteSvg />
        <span className="ml-2">Copy</span>
      </Button>
    </div>
  );
}

export default function KeysCard() {
  return (
    <div className="flex flex-col gap-11 max-w-3xl p-14 border border-slate-300 rounded-lg mx-auto">
      <div>
        <h2 className="text-4xl font-semibold tracking-wide mb-9">
          Your API Key & Secret Key
        </h2>
        <p className="text-lg font-extralight tracking-wide">
          <span className="font-medium">*Note</span> : The secret key is a
          sensitive piece of information that is only shown once. You will not
          be able to see it again, so it is important to save it in a safe
          place. In the future, you can only change your API key and secret key.{" "}
        </p>
      </div>
      <div>
        <small>*your Organization API Key </small>
        <InputWithButtons />
      </div>
      <div>
        <small>*your Organization Secret Key </small>
        <InputWithButtons />
      </div>
      <Button
        className="self-center bg-accent hover:bg-accent/80 text-black tracking-wide py-2 px-4"
        type="button"
      >
        <CheckSquareValid />
        <span className="ml-3">I’ve Stored The Keys In Safe and Want To Proceed</span>
      </Button>
    </div>
  );
}