import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import { MdDelete } from "react-icons/md";
import Tasks from "./Tasks";
import { saveLocalStorage } from "../globalMethods";
import { TaskAndExceptButtonContainer } from "./Task";
import Input from "./Input";

interface CategoryProps {
  category: string;
  index: number;
}

interface CategoryContainerProps {
  isDragging: boolean;
}

const CategoryContainer = styled.article<CategoryContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.categoryColor};
  border-radius: 0.5rem;
  box-shadow: ${(props) =>
    props.isDragging ? "0rem 0.3rem 0.3rem #111314" : ""};
`;

const TitleAndExceptButtonContainer = styled(TaskAndExceptButtonContainer)`
  width: 100%;

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

const TaskInput = styled(Input)`
  cursor: text;
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
  const onValid = (text: string) => {
    text = text.trim();

    if (text === "") return;

    const newTask = {
      id: Date.now(),
      text,
    };

    setTodos((allCategories) => {
      const targetTasks = allCategories[category];
      const updateTargetTasks = [newTask, ...targetTasks];
      const newTodos = {
        ...allCategories,
        [category]: updateTargetTasks,
      };
      saveLocalStorage(newTodos);

      return newTodos;
    });
  };

  return (
    <Draggable draggableId={category} index={index} key={category}>
      {(provided, snapshot) => (
        <CategoryContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <TitleAndExceptButtonContainer>
            <h3>{category}</h3>
            <button onClick={removeCategory}>
              <MdDelete />
            </button>
          </TitleAndExceptButtonContainer>
          <TaskInput
            onValid={onValid}
            name={category}
            placeholder={`Add task on ${category}`}
          />
          <Tasks category={category} />
        </CategoryContainer>
      )}
    </Draggable>
  );
}

export default React.memo(Category);
