import { IResultFunction, IResultModal } from "../../interfaces";
import "./result.css";

const ResultModal = ({ result, init }: IResultFunction) => {
  return (
    <div className="result">
      <h2>Result</h2>
      <div className="box">
        <div className="title">Total Words</div>
        <div className="ans">{result.TOTAL_WORDS}</div>
      </div>
      <div className="box">
        <div className="title">Correct Words</div>
        <div className="ans">{result.CORRECT_WORDS}</div>
      </div>
      <div className="box">
        <div className="title">Incorrect Words</div>
        <div className="ans">{result.INCORRECT_WORDS}</div>
      </div>
      <div className="box">
        <div className="title">Correct Words Accuracy</div>
        <div className="ans">{result.WORDS_ACCURACY.toFixed(2)}</div>
      </div>
      <div className="box">
        <div className="title">Total Character</div>
        <div className="ans">{result.TOTAL_CHARACTERS}</div>
      </div>
      <div className="box">
        <div className="title">Correct Character</div>
        <div className="ans">{result.CORRECT_CHARACTERS}</div>
      </div>
      <div className="box">
        <div className="title">Incorrect Character</div>
        <div className="ans">{result.INCORRECT_CHARACTERS}</div>
      </div>
      <div className="box">
        <div className="title">Correct Character Accuracy</div>
        <div className="ans">{result.CHARACTER_ACCURACY.toFixed(2)}</div>
      </div>

      <button onClick={()=>init()}>Try again</button>
    </div>
  );
};

export default ResultModal;
