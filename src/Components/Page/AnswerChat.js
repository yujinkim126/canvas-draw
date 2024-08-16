import { useEffect, useState } from "react";
import styled from "styled-components";

const AnswerChat = () => {
  const [inputAnswer, setInputAnswer] = useState("");
  const [chatArr, setChatArr] = useState([]);

  const handleInput = (e) => {
    console.log("입력중", e.target.value);
    setInputAnswer(e.target.value);
  };

  const handleEnterAnswer = () => {
    console.log("정답 전송", inputAnswer);
    if (inputAnswer.length !== 0) {
      setChatArr([...chatArr, inputAnswer]);
      setInputAnswer("");
    }
  };

  useEffect(() => {
    console.log("화면 갱신::");
    console.log("갱신됨:::", inputAnswer, "어레이:", chatArr);
  }, [inputAnswer, chatArr]);

  return (
    <>
      <ChatWrap>
        {chatArr.length > 0 &&
          chatArr.map((msg, idx) => {
            return <div key={idx}>{msg}</div>;
          })}
      </ChatWrap>
      <InputWrap>
        <AnswerInput
          type="text"
          value={inputAnswer}
          onChange={(e) => handleInput(e)}
        ></AnswerInput>
        <InputEnterBtn onClick={handleEnterAnswer}>입력</InputEnterBtn>
      </InputWrap>
    </>
  );
};
export default AnswerChat;

const ChatWrap = styled.div`
  height: 150px;
  padding: 10px 0;
  overflow-y: auto;
`;

const InputWrap = styled.div`
  padding: 10px 0;
`;

const InputEnterBtn = styled.button`
  width: 40px;
  height: 30px;
  margin-left: 5px;
`;

const AnswerInput = styled.input`
  width: 340px;
  height: 24px;
  border-radius: 5px;
`;
