export const getAccessToken = (code: string): string => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    // split the cookie into name and value
    const [key, value] = cookie.split('=');
    // if the key matches code, return the value
    if (key.trim() === code) {
      console.log(value);
      return value;
    }
  }
  return 'could not get Access_token';
};
// export const decryptToken = (token: string): string => {
//   const bytes = CryptoJS.AES.decrypt(token, 'asjdhkasjdh');
//   const decoded = bytes.toString(CryptoJS.enc.Utf8);
//   return decoded;
// };
export function isImageUrl(url: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
  const lowerUrl = url.toLowerCase();

  return imageExtensions.some(extension => lowerUrl.endsWith(extension));
}
