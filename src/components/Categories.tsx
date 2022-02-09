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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, auto));
  grid-gap: 0.5rem;
`;

function Categories({ todos }: CategoriesProps) {
  return (
    <Droppable droppableId="categories" direction="horizontal">
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
