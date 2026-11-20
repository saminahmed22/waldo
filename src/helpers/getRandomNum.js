export default function getRandomNum(range) {
  if (!range) {
    throw new Error("Range has not been provided.");
  }

  const randomNum = Math.floor(Math.random() * (range + 1));

  return randomNum;
}
