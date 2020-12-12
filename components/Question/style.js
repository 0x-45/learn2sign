import styled from "styled-components";

export const QuestionWrapper = styled.div`
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
    height: 70vh;

    .dash {
      border: 1px solid black;
      padding: 1em;
      display: none;
      flex-direction: column;
      align-items: center;
    }
    .show-later {
      display: none;
    }
    .start-button {
      background-color: #ea1d1d;
      outline: none;
      border: none;
      color: white;
      padding: 1em 4em;
      font-size: 2em;
      line-height: 0;
      font-weight: 600;
    }
    .answer {
      margin: 20px 0;
    }
    .correct {
      color: green;
    }
    .incorrect {
      color: red;
    }
    .question {
      font-size: 2em;
      /* margin: 1em; */
    }
    .count-down {
      font-size: 3em;
      /* margin: 2em 0; */
    }
  }
`;
