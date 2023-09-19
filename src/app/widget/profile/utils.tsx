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
  throw new Error('Token not found');
};

export function isImageUrl(url: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
  const lowerUrl = url.toLowerCase();

  return imageExtensions.some(extension => lowerUrl.endsWith(extension));
}
