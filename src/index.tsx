import React, { useEffect, useRef } from "react";
import { imageData } from "./letters";

interface PaperWords {
  text?: string;
  width?: number;
  height?: number;
  letterType?: 1 | 2 | 3;
  style?: React.CSSProperties;
  animation?: boolean;
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PaperWords: React.FC<PaperWords> = ({
  text = "Your Text",
  letterType = 1,
  width = 75,
  height = 75,
  style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    margin: "30px 0 60px 0",
  },
  animation = true,
}) => {
  const imgsRef = useRef<HTMLElement[]>([]);
  const wordsArray = text?.toUpperCase().split("\n");

  useEffect(() => {
    if (!animation) {
      return;
    }

    imgsRef.current.forEach((img) => {
      const time = getRandomNumber(30, 50);
      setInterval(() => {
        const letter = img?.getAttribute("letter") || "";

        let deg = 11 * (getRandomNumber(1, 10) < 5 ? 1 : -1);

        img.style.transform = `rotate(${deg}deg)`;

        img?.setAttribute(
          "src",
          `data:image/png;base64,${
            imageData[letter][`${letter}-${getRandomNumber(1, 3)}`]
          }`
        );
      }, 10 * time);
    });
  }, []);

  return (
    <div style={style}>
      {wordsArray?.map((word: string, idx) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          key={idx}
        >
          {word.split("").map((letter, idx) => (
            <>
              {/^[a-z]$/i.test(letter) && (
                <img
                  key={idx}
                  ref={(el) => {
                    if (el) imgsRef.current.push(el);
                  }}
                  width={width}
                  height={height}
                  //@ts-ignore
                  letter={letter}
                  src={`data:image/png;base64,${
                    imageData[letter][`${letter}-${letterType}`]
                  }`}
                />
              )}

              {letter == " " && <div style={{ padding: "0 20px" }}></div>}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PaperWords;
