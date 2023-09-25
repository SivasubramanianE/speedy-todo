import React from "react";

export const AddTodo = ({ newItem, setNewItem, addTodoItem }) => {

  return (
    <div className="flex flex-row w-100">
      <form onSubmit={(e) => addTodoItem(e)}>
        <div className="relative w-50">
          <input
            type="text"
            className="h-14 w-100 pl-5 rounded-lg border"
            placeholder="Add todo"
            value={newItem?.label}
            onChange={(e) =>
              setNewItem({ ...newItem, label: e.target.value, checked: false })
            }
          />
          <div className="absolute top-2 right-2">
            <button className="h-10 w-10 text-white rounded-lg bg-red-500 hover:bg-red-600 flex  justify-center">
              <div className="self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
