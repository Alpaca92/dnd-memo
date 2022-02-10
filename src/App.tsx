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
    const { type, source, destination } = info;

    if (!destination) return;

    if (type === "categories") {
    } else {
      setTodos((allTodos) => {
        const [sourceCategoryName] = source.droppableId.split("-");
        const [destinationCategoryName] = destination.droppableId.split("-");
        const sourceCategory = [...allTodos[sourceCategoryName]];
        const destinationCategory = [...allTodos[destinationCategoryName]];
        const [excludedTaskObj] = sourceCategory.splice(source.index, 1);
        destinationCategory.splice(destination.index, 0, excludedTaskObj);

        const newTodos = {
          ...allTodos,
          [sourceCategoryName]: sourceCategory,
          [destinationCategoryName]: destinationCategory,
        };

        saveLocalStorage(newTodos);

        return newTodos;
      });
    }
  };

  const onValid = (categoryName: string) => {
    categoryName = categoryName.trim();

    if (categoryName === "") return;

    setTodos((allCategories) => {
      const duplicatedCategories = { ...allCategories };

      if (duplicatedCategories.hasOwnProperty(categoryName))
        return duplicatedCategories;

      const newAllCategories = { [categoryName]: [], ...duplicatedCategories };
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
