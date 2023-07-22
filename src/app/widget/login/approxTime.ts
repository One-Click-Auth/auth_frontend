function convertToApproxTime(time: string): string {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2].split('.')[0]);

  if (hours > 0) {
    return hours === 1 ? `${hours} hour` : `${hours} hours`;
  } else if (minutes > 0) {
    return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  } else {
    return seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
  }
}

// Example usage:
const time = '0:58:42.917218';
const approximateTime = convertToApproxTime(time);
console.log(approximateTime); // Output: "58 minutes"
export default convertToApproxTime;
