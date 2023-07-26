'use client';

import { useEffect } from 'react';

import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("3f4fbcca-a661-4125-a514-356943e00ed8");
  }, []);

  return null;
};

// Copy the site id from setup after entering crisp and clicking on setup.
