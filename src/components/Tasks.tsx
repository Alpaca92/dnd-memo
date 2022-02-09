import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodoState } from "../atoms";

const TasksContainer = styled.ul`
  width: 100%;
  height: calc(100% - 3rem);
  background-color: black;
  opacity: 0.1;
`;

function Tasks({ todo }: { todo: ITodoState }) {
  const tasks = todo[Object.keys(todo)[0]];

  return (
    <Droppable droppableId="tasks">
      {(provided, snapshot) => (
        <TasksContainer ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, idx) => (
            <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {task.text}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </TasksContainer>
      )}
    </Droppable>
  );
}

export default Tasks;
