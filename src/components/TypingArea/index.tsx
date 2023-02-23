import { useEffect, useState } from "react";
import { paragraphs } from "../../common";
import { IResultModal } from "../../interfaces";
import Loader from "../Loader";
import ResultModal from "../ResultModal";
import "./typingArea.css";

const TypingArea = () => {
  const [paragraph, setParagraph] = useState<string>("");
  const [val, setVal] = useState<string>("");
  const [wrongIds, setWrongIds] = useState<Array<number | undefined>>([]);
  const [currentCh, setCurrentCh] = useState<number>(0);
  const [time, setTime] = useState<number>();
  const [_interval, _setInterval] = useState<NodeJS.Timer>();
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<IResultModal>();

  const setNewParagraphAndTime = () => {
    const randomNo = Math.ceil(Math.random() * paragraphs.length);
    const _paragraph = paragraphs[randomNo];
    setParagraph(_paragraph.text);
    setTime(_paragraph.time);
  };

  const finishTest = () => {
    setLoading(true);
    if (_interval) {
      clearInterval(_interval);
    }

    const totalCharacter = val.length;
    let correctCharacter = 0;

    for (let i = 0; i < totalCharacter; i++) {
      if (val[i] === paragraph[i]) {
        correctCharacter++;
      }
    }

    const wordsArray = val.split(" ");
    const pWordsArray = paragraph.split(" ");
    const totalWords = wordsArray.length;
    let correctWords = 0;

    for (let i = 0; i < totalWords; i++) {
      if (wordsArray[i] === pWordsArray[i]) {
        correctWords++;
      }
    }

    const ch_accuracy = (correctCharacter * 100) / totalCharacter;
    const w_accuracy = (correctWords * 100) / totalWords;
    debugger;
    const _result = {
      TOTAL_CHARACTERS: totalCharacter,
      CORRECT_CHARACTERS: correctCharacter,
      INCORRECT_CHARACTERS: totalCharacter - correctCharacter,
      TOTAL_WORDS: totalWords,
      CORRECT_WORDS: correctWords,
      INCORRECT_WORDS: totalWords - correctWords,
      CHARACTER_ACCURACY: ch_accuracy,
      WORDS_ACCURACY: w_accuracy,
    };
    setResult(_result);
    setLoading(false);
  };

  const init = () => {
    setNewParagraphAndTime();
    setVal("");
    setWrongIds([]);
    setCurrentCh(0);
    _setInterval(undefined);
    setLoading(false);
    setResult(undefined);
  };

  const handleChange = (event: any) => {
    if (!(loading || result)) {
      if (!_interval) {
        const interval = setInterval(() => {
          setTime((preState) => (preState ? preState - 1 : preState));
        }, 1000);
        _setInterval(interval);
      }
      setVal(event.target.value);
      setCurrentCh(event.target.value.length);
      return () => {
        if (_interval) {
          clearInterval(_interval);
        }
      };
    }
  };
  useEffect(() => {
    setNewParagraphAndTime();
  }, []);

  useEffect(() => {
    const ids = val
      .split("")
      .map((ch, ind) => {
        if (ch !== paragraph[ind]) return ind;
      })
      .filter((id) => id);
    setWrongIds(ids);
      if(paragraph.length){
        if (val.length === paragraph.length) {
          finishTest();
        }
      }
  }, [val]);

  useEffect(() => {
    if (time === 0) {
      finishTest();
    }
  }, [time]);
  return loading ? (
    <Loader />
  ) : (
    <div className="Typing-area">
      {result ? <ResultModal init={init} result={result} /> : null}
      <p>{time}</p>
      <p id="textarea">
        {paragraph.split("").map((character, ind) => {
          const pClasses = [wrongIds.indexOf(ind) !== -1 ? "error" : ""];
          pClasses.push(currentCh === ind ? "current" : "");
          pClasses.push(character === " " ? "space" : "");
          return (
            <span
              key={Math.ceil((Date.now() / 1000) * Math.random())}
              className={pClasses.join(" ")}
              id={String(ind)}
            >
              {character}
            </span>
          );
        })}
      </p>
      <textarea
        disabled={!!(loading || result)}
        onChange={handleChange}
        value={val}
        onPaste = {(e)=>e.preventDefault()}
      ></textarea>
    </div>
  );
};

export default TypingArea;
