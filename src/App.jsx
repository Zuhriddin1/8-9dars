import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "tailwindcss/tailwind.css";
const initialItems = [
  { id: "Input-1", content: "Input 1", input: "" },
  { id: "Input-2", content: "Input 2", input: "" },
  { id: "Input-3", content: "Input 3", input: "" },
];
function App() {
  const [items, setItems] = useState(initialItems);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setItems(newItems);
  };
  const handleInputChange = (id, value) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, input: value } : item
    );
    setItems(newItems);
  };
  return (
    <div className="p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white p-4 rounded shadow flex items-center justify-between transition-transform transform ${
                        snapshot.isDragging ? "shadow-lg z-10" : ""
                      }`}
                    >
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={item.input}
                          onChange={(e) =>
                            handleInputChange(item.id, e.target.value)
                          }
                          className="border border-gray-300 rounded p-2 w-full"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-blue-500 text-white rounded px-4 py-2">
                          Button
                        </button>
                        <div className="cursor-grab">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                          </svg>
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
  );
}
export default App;