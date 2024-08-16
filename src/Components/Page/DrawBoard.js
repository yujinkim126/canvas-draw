import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectColor } from "../../Redux/colorSlice";
import styled from "styled-components";
import { selectStroke } from "../../Redux/strokeSlice";

const DrawBoard = () => {
  const boardRef = useRef(null);
  const color = useSelector(selectColor);
  const stroke = useSelector(selectStroke);

  let ctx;
  let isDrawing = false;

  const handleMouseDown = (e) => {
    // 그리기 시작
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
  };

  const handleMouseMove = (e) => {
    // 그리는 중
    if (isDrawing) {
      ctx.lineTo(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    // 그리기 종료
    isDrawing = false;
  };

  const allReset = () => {
    // 초기화 기능
    ctx.clearRect(0, 0, boardRef.current.width, boardRef.current.height);
  };

  const saveImage = () => {
    // 이미지 저장
    const dataURL = boardRef.current.toDataURL("image/jpg", 1.0);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "PaintJS";
    link.click();
  };

  useEffect(() => {
    const canvas = boardRef.current;
    ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = color; // redux에 저장된 색상 사용
      ctx.lineWidth = stroke; // redux에 저장된 선 굵기 사용
    } else {
      console.log("캔버스 사용할 수 없는 상황");
    }
  }, [color, stroke]);

  return (
    <div>
      <CanvasWrap>
        <canvas
          id="canvas"
          width={400}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={boardRef}
        ></canvas>
      </CanvasWrap>

      <DrawSettingIconWrap>
        <ResetIcon
          src={process.env.PUBLIC_URL + "/image/reset.png"}
          alt="reset"
          onClick={allReset}
        />

        <SaveIcon
          src={process.env.PUBLIC_URL + "/image/download.png"}
          alt="download"
          onClick={saveImage}
        />
      </DrawSettingIconWrap>

      {/* <AnswerChat /> */}
    </div>
  );
};
export default DrawBoard;

const CanvasWrap = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 400px;
  height: 320px;
`;

const DrawSettingIconWrap = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const SaveIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-left: 10px;
`;

const ResetIcon = styled.img`
  width: 22px;
  height: 22px;
`;
