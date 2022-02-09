import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoState, todoState } from "../atoms";
import { MdDelete } from "react-icons/md";
import Tasks from "./Tasks";

interface CategoryProps {
  todo: ITodoState;
  idx: number;
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

const TitleAndExceptButtonContainer = styled.div`
  position: relative;

  & > h3 {
    font-weight: 500;
    text-align: center;
    font-size: 1.2rem;
    padding: 1rem 0;
  }

  & > button {
    all: unset;
    font-size: 1.2rem;
    position: absolute;
    top: 1rem;
    right: 0.6rem;
    color: rgba(255, 255, 255, 0.1);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
    }
  }
`;

function Category({ todo, idx }: CategoryProps) {
  const setTodos = useSetRecoilState(todoState);
  const [category] = Object.keys(todo);
  const removeCategory = () => {
    setTodos((allCategories) => {
      const duplicatedTodos = [...allCategories];
      const exceptedCurrentCategory = duplicatedTodos.filter(
        (todo) => Object.keys(todo)[0] !== category
      );

      localStorage.setItem("memo", JSON.stringify(exceptedCurrentCategory));

      return exceptedCurrentCategory;
    });
  };

  return (
    <Draggable draggableId={category} index={idx} key={category}>
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
          <Tasks todo={todo} />
        </CategoryContainer>
      )}
    </Draggable>
  );
}

export default React.memo(Category);
