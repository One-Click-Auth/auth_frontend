'use client';
import { useState, useEffect } from 'react';

import { AiFillCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

type PasswordCheckProps = {
  pass: string;
};

export function PasswordCheck({ pass }: PasswordCheckProps) {
  const [checks, setChecks] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    number: false
  });

  useEffect(() => {
    setChecks({
      length: pass.length >= 8,
      lowerCase: /[a-z]/.test(pass),
      upperCase: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass)
    });
  }, [pass]);

  return (
    <div className="w-full border rounded-md border-gray-400 p-4 mt-1 flex flex-col gap-3 bg-white backdrop-blur-lg backdrop-opacity-80 bg-opacity-50">
      <span className="text-sm">Your pass must contain:</span>
      <div className="flex items-center gap-2">
        {' '}
        {checks.length ? (
          <AiFillCheckCircle className="text-green-600" />
        ) : (
          <AiOutlineCloseCircle />
        )}
        <p className="text-muted-foreground"> At least 8 Characters</p>
      </div>

      <div className="flex items-center gap-2">
        {' '}
        {checks.lowerCase ? (
          <AiFillCheckCircle className="text-green-600" />
        ) : (
          <AiOutlineCloseCircle />
        )}
        <p className="text-muted-foreground"> Lower case letters (a-z)</p>
      </div>

      <div className="flex items-center gap-2">
        {' '}
        {checks.upperCase ? (
          <AiFillCheckCircle className="text-green-600" />
        ) : (
          <AiOutlineCloseCircle />
        )}
        <p className="text-muted-foreground"> Upper case letters (A-Z)</p>
      </div>

      <div className="flex items-center gap-2">
        {' '}
        {checks.number ? (
          <AiFillCheckCircle className="text-green-600" />
        ) : (
          <AiOutlineCloseCircle />
        )}
        <p className="text-muted-foreground"> Numbers (0-9)</p>
      </div>
    </div>
  );
}
