import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Category from './components/Category';
import Input from "./components/Input";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 3rem;
  line-height: 5rem;
`;

function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Title>Drag and Drop Memo</Title>
        <Input />
        <Category />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
