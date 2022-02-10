import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const TasksContainer = styled.ul`
  width: 100%;
  height: calc(100% - 3rem);
  background-color: black;
  opacity: 0.1;
`;

function Tasks() {

  return (
    <Droppable droppableId="tasks">
      {(provided, snapshot) => (
        <TasksContainer ref={provided.innerRef} {...provided.droppableProps}>
          
          {provided.placeholder}
        </TasksContainer>
      )}
    </Droppable>
  );
}

export default Tasks;
