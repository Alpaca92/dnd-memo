import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodoState } from "../atoms";
import Category from "./Category";

interface CategoriesProps {
  todos: ITodoState;
}

const CategoriesContainer = styled.section`
  margin: 2rem 0;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, auto));
  grid-gap: 0.5rem;
`;

function Categories({ todos }: CategoriesProps) {
  const categories = Object.keys(todos);

  return (
    <Droppable key="categories" droppableId="categories" direction="horizontal">
      {(provided, snapshot) => (
        <CategoriesContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {categories.map((category, index) => (
            <Category key={category} index={index} category={category} />
          ))}
          {provided.placeholder}
        </CategoriesContainer>
      )}
    </Droppable>
  );
}

export default Categories;
