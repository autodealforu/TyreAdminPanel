import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
  {
    id: "item-1",
    dataURL: "https://picsum.photos/seed/6/600",
  },
  {
    id: "item-2",
    dataURL: "https://picsum.photos/seed/7/600",
  },
  {
    id: "item-3",
    dataURL: "https://picsum.photos/seed/8/600",
  },
  {
    id: "item-4",
    dataURL: "https://picsum.photos/seed/9/600",
  },
  {
    id: "item-5",
    dataURL: "https://picsum.photos/seed/2/600",
  },
  {
    id: "item-6",
    dataURL: "https://picsum.photos/seed/1/600",
  },
  {
    id: "item-7",
    dataURL: "https://picsum.photos/seed/8/600",
  },
  {
    id: "item-8",
    dataURL: "https://picsum.photos/seed/6/600",
  },
  {
    id: "item-9",
    dataURL: "https://picsum.photos/seed/1/600",
  },
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
  //   userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: "120px",
  background: isDragging ? "lightblue" : "#f1f1f1",
  borderRadius: 5,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "250px",
});

const GalleryComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });
    setItems(reorderedItems);
  };

  return (
    <div className="main_content">
      <div className="row">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div style={{ display: "inline-flex" }}>
                        <div>
                          <div
                            className="card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div>
                              <img
                                src={item.dataURL}
                                style={{ width: "100%" }}
                              />
                              <a className="btn-sm btn-danger">
                                <i className="fa fa-trash"> </i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default GalleryComponent;
