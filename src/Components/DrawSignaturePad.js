import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import SignatureCanvas from "react-signature-canvas";

const DrawSignaturePad = () => {
  const [selectColor, setSelectColor] = useState("black");
  const canvasRef = useRef({});

  const colors = ["black", "red", "blue", "green", "yellow", "pink"];

  const saveImage = () => {
    // 가져올 이미지 링크
    const dataURL = canvasRef.current.toDataURL("image/png");

    // 이미지 a 태그로 브라우저 다운 방법
    const imgLink = document.createElement("a");
    imgLink.href = dataURL;
    imgLink.download = "draw";
    imgLink.click();
  };

  return (
    <PaintBoard>
      <ItemWrap>
        <PalleteWrap>
          {colors.map((item, index) => {
            return (
              <Palette
                key={index}
                onClick={() => setSelectColor(item)}
                isSelected={selectColor === item}
                color={item}
              ></Palette>
            );
          })}
        </PalleteWrap>
        <SignatureCanvas
          ref={canvasRef}
          penColor={selectColor}
          canvasProps={{
            width: 440,
            height: 450,
            className: "drawCanvas",
          }}
        />
        <DrawSettingIconWrap>
          <ResetIcon
            src={process.env.PUBLIC_URL + "/image/reset.png"}
            alt="reset"
            onClick={() => {
              canvasRef.current.clear();
            }}
          />

          <SaveIcon
            src={process.env.PUBLIC_URL + "/image/download.png"}
            alt="download"
            onClick={saveImage}
          />
        </DrawSettingIconWrap>
      </ItemWrap>
    </PaintBoard>
  );
};
export default DrawSignaturePad;

const PaintBoard = styled.div`
  width: 450px;
  height: 550px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const PalleteWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Palette = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 10px;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};

  ${(props) =>
    props.isSelected &&
    css`
      border-color: ${(props) =>
        props.color === "black"
          ? "red"
          : "black"}; /* 선택 색상이 검은색이면 외곽선 색상을 빨간색으로 변경 , 이외에는 외곽선 검은색. */
    `}
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
