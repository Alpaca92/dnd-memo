import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodoState } from "../atoms";

interface CategoryProps {
  todo: ITodoState;
  idx: number;
}

const CategoryContainer = styled.article`
  min-height: 20rem;
  background-color: ${(props) => props.theme.categoryColor};
  border-radius: 0.5rem;
`;

const CategoryTitle = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem 0;
`;

function Category({ todo, idx }: CategoryProps) {
  const [category] = Object.keys(todo);

  console.log(category);

  return (
    <Draggable draggableId={category} index={idx} key={category}>
      {(provided, snapshot) => (
        <CategoryContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CategoryTitle>{category}</CategoryTitle>
        </CategoryContainer>
      )}
    </Draggable>
  );
}

export default React.memo(Category);
