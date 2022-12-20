export const formatDate = (date, partTime = false) => {
  const currDate = date.getDate();
  const currMonth = date.getMonth() + 1;
  const currYear = date.getFullYear();
  const currHours = date.getHours();
  const currMinutes = date.getMinutes();
  const currSeconds = date.getSeconds();

  if (partTime) {
    return (
      addZeroDataNum(currDate) +
      "." +
      addZeroDataNum(currMonth) +
      "." +
      currYear +
      " " +
      addZeroDataNum(currHours) +
      ":" +
      addZeroDataNum(currMinutes) +
      ":" +
      addZeroDataNum(currSeconds)
    );
  } else
    return (
      addZeroDataNum(currDate) +
      "." +
      addZeroDataNum(currMonth) +
      "." +
      currYear
    );
};

export const addZeroDataNum = (num) => {
  return num >= 0 && num <= 9 ? "0" + num : num;
};
