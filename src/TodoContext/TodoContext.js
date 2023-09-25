import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import SearchTodo from "../SearchTodo/SearchTodo";
import jsf from 'json-schema-faker';



const TodoContext = () => {
  const title = "To Do ";

  const noItemsFound = "No items found";

  // Define your JSON schema
const schema = {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
      },
      label: {
        type: 'string',
      },
      checked: {
        type: 'boolean',
      },
    },
    required: ['id', 'label', 'checked'],
  };
  
  // Generate fake data
  const numberOfItems = 10; // Change this to the number of items you want
  const fakeDataArray = Array.from({ length: numberOfItems }, () => jsf.generate(schema));
  

  const [itemList, setItemList] = useState(fakeDataArray);




  
  
  
  
  
  

  const initialNewItem = {
    id: 1,
    label: "",
    checked: false,
  };

  const [newItem, setNewItem] = useState(initialNewItem);

  const [searchItem, setSearchItem] = useState('');

  const addTodoItem = (e) => {
    e.preventDefault();
    if (!newItem?.label) return;
    
    newItem.id = itemList.length + 1;
    const newList = [...itemList, newItem];

    setItemList(newList);
    setNewItem(initialNewItem);
  };

  const handleItemChecked = (id) => {
    setItemList(
      itemList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleItemRemove = (id) => {
    setItemList((prevItemList) =>
      prevItemList.map((item) =>
        item.id === id ? { ...item, fadeOut: true } : item
      )
    );
    setTimeout(() => {
      setItemList((prevItemList) =>
        prevItemList.filter((item) => item.id !== id)
      );
    }, 400);
  };

  const filteredItems = itemList.filter(a => (a.label).toLowerCase().includes(searchItem.toLowerCase()));


  return (
    <div className="flex flex-col">
      <header className="p-3 flex flex-row justify-between items-center w-100">
        
        <SearchTodo searchItem ={searchItem} setSearchItem ={setSearchItem}/>

        <h1>
          {title} ({filteredItems.length})
        </h1>
        
        <AddTodo
          newItem={newItem}
          setNewItem={setNewItem}
          addTodoItem={addTodoItem}
        />
      </header>
     
      <main className="p-3">
        {filteredItems.length > 0 ? (
          <div>
            {filteredItems.map((a) => (
              <div
                className={`flex flex-row justify-between border-2 border-grey p-3 mb-2  transition-opacity ${
                  a.fadeOut ? "opacity-0 duration-300" : "opacity-100"
                }`}
                key={a.id}
              >
                <div className="flex justify-between items-center">
                  <input
                    className="mx-3 w-4 h-4 "
                    type="checkbox"
                    onChange={() => handleItemChecked(a.id)}
                    checked={a.checked}
                  />

                  <label className={a.checked ? "line-through" : null}>
                    {a.label}
                  </label>
                </div>

                <div
                  className="cursor-pointer "
                  onClick={() => handleItemRemove(a.id)}
                >
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p> {noItemsFound}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoContext;
