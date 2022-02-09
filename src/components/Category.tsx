import { Droppable } from "react-beautiful-dnd";

function Category() {
  return (
    <Droppable droppableId="1">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <h4>qwjdqwiodjqwiod</h4>
        </div>
      )}
    </Droppable>
  );
}

export default Category;
