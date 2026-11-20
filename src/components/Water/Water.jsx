import styles from "./Water.module.css";

// Components
import Fish from "../Fish/Fish";

// Helpers
import getRandomNum from "../../helpers/getRandomNum";
import getViewPortSize from "../../helpers/getViewPortSize";
import getFishNames from "../../helpers/getFishNames";

export default function Water() {
  const getFishies = ({ count, isRandom = false, layer = 3 }) => {
    const { top, left } = getViewPortSize();

    const fishArr = [];

    /*
    Subtracting 75 so that the fishes don't go outside the viewport
    (each one covers an area of area 75*75 pixels)
    */

    const fishNames = getFishNames();

    if (isRandom) {
      for (let index = 0; index < count; index++) {
        const len = fishNames.length;
        const rand = getRandomNum(len);
        const fishName = fishNames[rand >= 1 ? rand - 1 : rand];

        fishArr.push(
          <Fish
            name={fishName}
            key={`${fishName}_${index}_${layer}_${crypto.randomUUID()}`}
            top={`${getRandomNum(top - 75)}`}
            left={`${getRandomNum(left - 75)}`}
            angle={`${getRandomNum(360)}`}
          />,
        );
      }
    } else {
      while (fishArr.length < count) {
        fishNames.forEach((fishName, index) => {
          fishArr.push(
            <Fish
              name={fishName}
              key={`${fishName}_${index}_${layer}_${crypto.randomUUID()}`}
              top={`${getRandomNum(top - 75)}`}
              left={`${getRandomNum(left - 75)}`}
              angle={`${getRandomNum(360)}`}
            />,
          );
        });
      }
    }

    return fishArr.length > count ? fishArr.slice(0, count - 1) : fishArr;
  };

  return (
    <div className="water">
      <div className={styles.waves}></div>

      <div className={`${styles.levelOne} ${styles.level}`}></div>

      <div className={`${styles.levelTwo} ${styles.level}`}></div>

      <div className={`${styles.levelThree} ${styles.level}`}>
        {getFishies({ count: 1 })}
      </div>
    </div>
  );
}
