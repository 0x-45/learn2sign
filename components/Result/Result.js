import { CorrectWrapper, InCorrectWrapper } from "./style";

export const Correct = (props) => {
  return (
    <CorrectWrapper>
      <div className="main">
        <div className="result">Correct Answer! Congratulations</div>
        <button
          className="try-button"
          onClick={() => {
            location.reload();
          }}
        >
          Try Again
        </button>
      </div>
    </CorrectWrapper>
  );
};

export const InCorrect = (props) => {
  return (
    <InCorrectWrapper>
      <div className="main">
        <div className="result">Your Answer Was Wrong</div>
        <div>The question was {props.question}</div>
        <button
          className="try-button"
          onClick={() => {
            location.reload();
          }}
        >
          Try Again
        </button>
      </div>
    </InCorrectWrapper>
  );
};
