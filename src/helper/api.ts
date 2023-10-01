import { API_URL } from '@/constants';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const userChronoInfo = (data: any) => {
  const body = JSON.stringify(data);
  return fetch(API_URL.USER_INFO, {
    method: 'POST',
    headers,
    body
  }).then(res => res.json());
};

export const checkUser = async ({
  emailid,
  fa2 = false
}: {
  emailid: string;
  fa2?: boolean;
}) => {
  const body = JSON.stringify({
    emailid: emailid.toLowerCase(),
    fa2
  });
  const response = await fetch(API_URL.USER_INFO, {
    method: 'POST',
    headers,
    body
  })
    .then(res => res.json())
    .catch(err => console.log(err));
  return response;
};

export const getRandomPassword = async () => {
  const response = await fetch(API_URL.RANDOM_PASSWORD, {
    method: 'GET',
    headers
  }).then(res => res.json());
  return response;
};
