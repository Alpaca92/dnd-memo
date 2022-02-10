import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Categories from "./components/Categories";
import Input from "./components/Input";
import { saveLocalStorage } from "./globalMethods";

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
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    // const { destination, source } = info;
    // const duplicatedTodos = [...todos];
    // const [categoryObj] = duplicatedTodos.splice(source.index, 1);
    // duplicatedTodos.splice(destination?.index || 0, 0, categoryObj);
    // localStorage.setItem("memo", JSON.stringify(duplicatedTodos));
    // setTodos(duplicatedTodos);
  };

  const onValid = (name: string) => {
    name = name.trim();

    if (name === "") return;

    setTodos((allCategories) => {
      const duplicatedCategories = { ...allCategories };

      if (duplicatedCategories.hasOwnProperty(name))
        return duplicatedCategories;

      const newAllCategories = { [name]: [], ...duplicatedCategories };
      saveLocalStorage(newAllCategories);

      return newAllCategories;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Title>Drag and Drop Memo</Title>
        <Input
          onValid={onValid}
          name="category"
          placeholder="write your custom category"
        />
        <Categories todos={todos} />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
