export default function getFishNames() {
  const fishNames = [];

  const modules = import.meta.glob("../assets/fishies/*/anim.gif");

  Object.keys(modules).forEach((fishPath) => {
    const fishName = fishPath.split("/")[3];

    fishNames.push(fishName);
  });

  return fishNames;
}
