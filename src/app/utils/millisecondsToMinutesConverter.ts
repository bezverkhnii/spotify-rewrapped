export const millisecondsToMinutesConverter = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  //@ts-ignore
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
