import styles from "./Fish.module.css";

// Hooks
import { useState, useEffect, useRef } from "react";

// Helpers
import getViewPortSize from "../../helpers/getViewPortSize";
import { animatedPoints } from "happy-dom/lib/PropertySymbol";

export default function Fish({
  name,
  top = "0px",
  left = "0px",
  angle = "90",
}) {
  if (!name) {
    throw new Error("No name has been provided.");
  }

  // Refs
  const fishRef = useRef();

  const thresholds = useRef({
    topStart: Number(top),
    topEnd: Number(top) + 75,
    leftStart: Number(left),
    leftEnd: Number(left) + 75,
  });

  // Effects
  useEffect(() => {
    // fishRef.current.animate(
    //   [
    //     // key frames
    //     { transform: "translateY(0vw)" },
    //     { transform: "translateY(-100vw)" },
    //   ],
    //   {
    //     // sync options
    //     duration: 10000,
    //     iterations: Infinity,
    //   },
    // );

    //       θ = arctan(h / w)
    // 18.4°
    // Blue angle = 2θ
    // 36.9°
    // Yellow angle = 180° − 2θ

    const { top, left } = getViewPortSize();

    const cornerAngle = Math.atan2(top, left) * 180;

    const boundaries = 180 - cornerAngle;

    const normalizedAngle = ((angle + 180) % 360) - 180;

    // const sideAngles = 2 * arctan;

    // const vertAngles = 180 - sideAngles;

    console.log({
      top,
      left,
      cornerAngle,
      boundaries,
      // sideAngles,
      // vertAngles,
      angle,
      normalizedAngle,
    });
  }, [left, top, angle]);

  const url = new URL(`../../assets/fishies/${name}/anim.gif`, import.meta.url)
    .href;

  const styleObj = {
    top: `${top}px`,
    left: `${left}px`,
    rotate: `${angle}deg`,
  };

  return (
    <img
      className={`${styles.fish} ${styles.fishOne}`}
      src={url}
      alt={`Image of a ${name}`}
      style={styleObj}
      ref={fishRef}
      draggable="false"
    />
  );
}

/*


1.  pick an initial random position, and an angle. 
    e.g., position : {top: 100px, left: 315px}, angle: 35deg

2.  Check for all the borders and calulate the distance.

3.  When ever the fish reaches the 20% threshold for any of the 4 borders, trigger the rotation function. 

4. The rotation function will select another random angle. Afterwards, it will trigger the distance function.

5. The distance function, as earlier, will calculate the distance of the fish from all the borders.


1.  getRandomAngle()
2.  getDistance()

3.  triggerSwimAnimation() after it reaches to the threshold, it will change the swin animation adjusting the direction,
     bottom or left values etc
4.  listener()

Here 4 core function will be at play:
1. The distance calulator: Calculate the distance of the fish from all of the four borders,
    also provide the 20% threshold value for each direction.

2. The rotator: Will pick a random angle, at least (+/-)20deg from the previous one, and trigger an rotating animation.

3. The listener: It will actively listen the movement of the fish and trigger the rotator based on the threshold value given by the
    distance calulator

4. Swim animation.





I need to create a bordering area based on it's current position. A 75x75sq area

rect.top + window.scrollY -> the absolute positioning for the fish, but the edge.

so what ever value I get adding 75 will give me for both top edges and left edges

top: starting = 570px, end= 645px
left:  starting = 356px, end= 431px


overlap width = min(x_end of A, x_end of B) − max(x_start of A, x_start of B)
overlap height = min(y_end of A, y_end of B) − max(y_start of A, y_start of B)
If either is zero or negative, there is no overlap (use 0). Otherwise overlap area = overlap width × overlap height.

if fishes or threshold overlaps trigger change direction and reinitiate the swim animatiom
*/
