export const formatTime = (time: number) => {
  const hours = Math.trunc(time / 3600);
  const minutes = Math.trunc((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
};
