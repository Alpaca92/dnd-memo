import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import { MdDelete } from "react-icons/md";
import Tasks from "./Tasks";
import { saveLocalStorage } from "../globalMethods";
import { TaskAndExceptButtonContainer } from "./Task";

interface CategoryProps {
  category: string;
  index: number;
}

interface CategoryContainerProps {
  isDragging: boolean;
}

const CategoryContainer = styled.article<CategoryContainerProps>`
  height: 20rem;
  background-color: ${(props) => props.theme.categoryColor};
  border-radius: 0.5rem;
  box-shadow: ${(props) =>
    props.isDragging ? "0rem 0.3rem 0.3rem #111314" : ""};
`;

const TitleAndExceptButtonContainer = styled(TaskAndExceptButtonContainer)`
  & > h3 {
    font-weight: 500;
    text-align: center;
    font-size: 1.2rem;
    padding: 1rem 0;
  }

  & > button {
    font-size: 1.2rem;
    top: 1rem;
    right: 0.6rem;
  }
`;

function Category({ category, index }: CategoryProps) {
  const setTodos = useSetRecoilState(todoState);
  const removeCategory = () => {
    setTodos((allCategories) => {
      const duplicatedCategories = { ...allCategories };
      delete duplicatedCategories[category];
      saveLocalStorage(duplicatedCategories);

      return duplicatedCategories;
    });
  };

  return (
    <Draggable draggableId={category} index={index} key={category}>
      {(provided, snapshot) => (
        <CategoryContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <TitleAndExceptButtonContainer>
            <h3 {...provided.dragHandleProps}>{category}</h3>
            <button onClick={removeCategory}>
              <MdDelete />
            </button>
          </TitleAndExceptButtonContainer>
          <Tasks category={category} />
        </CategoryContainer>
      )}
    </Draggable>
  );
}

export default React.memo(Category);
