export const getAccessToken = (code: string): string => {
  const cookies = document.cookie.split(';');
  let token = '';
  for (const cookie of cookies) {
    // split the cookie into name and value
    const [key, value] = cookie.split('=');
    // if the key matches code, return the value
    if (key === code) {
      token = value;
    }
  }
  console.log(token);
  return token;
};
