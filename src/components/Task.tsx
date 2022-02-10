import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Todo, todoState } from "../atoms";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { saveLocalStorage } from "../globalMethods";

interface TaskProps {
  index: number;
  category: string;
  task: Todo;
}

const TaskCard = styled.li`
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.cardColor};
  font-size: 0.9rem;

  & + li {
    margin-top: 0.5rem;
  }
`;

export const TaskAndExceptButtonContainer = styled.div`
  position: relative;

  & > button {
    all: unset;
    position: absolute;
    font-size: 0.9rem;
    top: 0;
    right: -0.4rem;
    color: rgba(255, 255, 255, 0.1);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
    }
  }
`;

function Task({ index, task, category }: TaskProps) {
  const setTodos = useSetRecoilState(todoState);
  const removeTask = () => {
    setTodos((allCategories) => {
      const targetTasks = allCategories[category];
      const { id } = task;
      const excludeSelectedTask = targetTasks.filter((task) => task.id !== id);
      const newTodos = {
        ...allCategories,
        [category]: excludeSelectedTask,
      };

      saveLocalStorage(newTodos);

      return newTodos;
    });
  };

  return (
    <Draggable draggableId={String(task.id)} key={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskAndExceptButtonContainer>
            <p>{task.text}</p>
            <button onClick={removeTask}>
              <RiDeleteBack2Fill />
            </button>
          </TaskAndExceptButtonContainer>
        </TaskCard>
      )}
    </Draggable>
  );
}

export default React.memo(Task);
