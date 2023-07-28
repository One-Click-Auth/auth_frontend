export const getDate = (timestamp: number) => {
  timestamp = timestamp * 1000; // Convert to milliseconds
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth(); // Months are zero-based, so we add 1
  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const monthName = monthNames[month];
  return String(day) + '-' + monthName + '-' + String(year);
};
