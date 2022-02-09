import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodoState } from "../atoms";
import Category from "./Category";

interface CategoriesProps {
  todos: ITodoState[];
}

const CategoriesContainer = styled.section`
  margin: 2rem 0;
  width: 90%;
`;

function Categories({ todos }: CategoriesProps) {
  return (
    <Droppable droppableId="categories">
      {(provided, snapshot) => (
        <CategoriesContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {todos.map((todo, idx) => (
            <Category key={Object.keys(todo)[0]} todo={todo} idx={idx} />
          ))}
          {provided.placeholder}
        </CategoriesContainer>
      )}
    </Droppable>
  );
}

export default Categories;
