import styled from "styled-components";
import DrawBoard from "./Page/DrawBoard";
import MenuBar from "./Page/MenuBar";
import { useState } from "react";

const Home = () => {
  return (
    <PaintBoard>
      <ItemWrap>
        <MenuBar />
        <DrawBoard />
      </ItemWrap>
    </PaintBoard>
  );
};
export default Home;

const PaintBoard = styled.div`
  width: 450px;
  height: 650px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
