import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Data = [
  { id: "Input-1", value: "", key: "" },
  { id: "Input-2", value: "", key: "" },
];
function App() {
  const [items, setItems] = useState(Data);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    setItems(newItems);
  };
  const handleInputChange = (id, field, value) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };
  return (
    <div className="p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1 className="p-2 font-bold text-[24px] leading-[36px] tracking-[0.1px] ">
          Loyiha ketma-ketligi
        </h1>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white w-[1100px] p-4 mb-2 rounded shadow-md flex items-center justify-between space-x-4 transition-transform transform ${
                        snapshot.isDragging ? "shadow-lg z-10" : ""
                      }`}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab"
                      >
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
                      <div className="flex flex-grow space-x-4">
                        <input
                          type="text"
                          placeholder="Ustun nomi"
                          value={item.value}
                          onChange={(e) =>
                            handleInputChange(item.id, "value", e.target.value)
                          }
                          className="border border-gray-300 rounded p-2 flex-grow"
                        />
                        <input
                          type="text"
                          placeholder="Key"
                          value={item.key}
                          onChange={(e) =>
                            handleInputChange(item.id, "key", e.target.value)
                          }
                          className="border border-gray-300 rounded p-2 flex-grow"
                        />
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
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() =>
          setItems([
            ...items,
            { id: `item-${items.length + 1}`, value: "", key: "" },
          ])
        }
      >
        Ustun qo'shish
      </button>
    </div>
  );
}
export default App;
