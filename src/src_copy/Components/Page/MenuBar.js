import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setColor } from "../../Redux/colorSlice";
import styled, { css } from "styled-components";

import { setStroke } from "../../Redux/strokeSlice";

const MenuBar = () => {
  const dispatch = useDispatch();
  const [selectStroke, setSelectStroke] = useState(1);
  const [selectColor, setSelectColor] = useState("black");

  const colors = ["black", "red", "blue", "green", "yellow", "pink"];

  const handlePallete = (color) => {
    dispatch(setColor(color)); // 색상을 Redux store에 저장합니다.
    setSelectColor(color);
  };

  const handleStroke = (e) => {
    setSelectStroke(e.target.value);
    dispatch(setStroke(e.target.value));
  };

  return (
    <MenuBarWrap>
      <StrokeWrap>
        <StrokeTitle>선 굵기</StrokeTitle>
        <input
          id="input"
          type="number"
          min="0"
          max="100"
          value={selectStroke}
          style={{ fontSize: "15px" }}
          onChange={(e) => handleStroke(e)}
        ></input>
      </StrokeWrap>
      <PalleteWrap>
        {colors.map((item, index) => {
          return (
            <Palette
              key={index}
              onClick={() => handlePallete(item)}
              isSelected={selectColor === item}
              color={item}
            ></Palette>
          );
        })}
      </PalleteWrap>
      <EragerIconWrap>
        <EragerIcon
          src={process.env.PUBLIC_URL + "/image/eraser.png"}
          alt="eraser"
          onClick={() => handlePallete("white")}
        />
      </EragerIconWrap>
    </MenuBarWrap>
  );
};
export default MenuBar;

const MenuBarWrap = styled.div`
  width: 400px;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const StrokeWrap = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const StrokeTitle = styled.p`
  margin-right: 5px;
`;

const PalleteWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Palette = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 5px 0 0;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};

  ${(props) =>
    props.isSelected &&
    css`
      border-color: ${(props) =>
        props.color === "black"
          ? "red"
          : "black"}; /* isSelected가 true이고 색상이 검은색이면 외곽선 색상을 노란색으로 변경합니다. 검은색이 아니면 검은색으로 유지합니다. */
    `}
`;

const EragerIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EragerIcon = styled.img`
  width: 25px;
  height: 25px;
`;
