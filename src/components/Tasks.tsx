import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import Task from "./Task";

const TasksContainer = styled.ul`
  width: 100%;
  height: calc(100% - 3rem);
  padding: 1rem;
`;

function Tasks({ category }: { category: string }) {
  const todos = useRecoilValue(todoState);
  const tasks = todos[category];

  return (
    <Droppable key={`${category}-tasks`} droppableId={`${category}-tasks`}>
      {(provided, snapshot) => (
        <TasksContainer ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task index={index} key={task.id} task={task} category={category} />
          ))}
          {provided.placeholder}
        </TasksContainer>
      )}
    </Droppable>
  );
}

export default Tasks;
