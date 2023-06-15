import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";

const localData = () => {
  let list = localStorage.getItem("todos");
  if (list) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

const App = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(localData());
  const [togglebtn, setToggleBtn] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const itemsAdd = () => {
    if (!input) {
      return alert("Please Enter A Todo");
    } else if (input && !togglebtn) {
      setItem(
        item.map((ele) => {
          if (ele.id === isEdit) {
            return { ...ele, name: input };
          }
          return ele;
        })
      );
      setToggleBtn(true);
      setInput("");
      setIsEdit(null);
    } else {
      const inputdata = { id: new Date().getTime().toString(), name: input };
      setItem([...item, inputdata]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    const filteredData = item.filter((ele, index) => ele.id !== id);
    setItem(filteredData);
    console.log(item);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(item));
  }, [item]);

  const handleEdit = (id) => {
    const newdata = item.find((ele) => ele.id === id);
    setToggleBtn(false);
    setInput(newdata.name);
    setIsEdit(id);
  };

  const deleteAll = () => [setItem([])];

  return (
    <div className="w-[100vw] h-[auto] bg-slate-600 text-yellow-200 flex flex-col justify-center items-center">
      <h2 className="text-3xl">Todo App</h2>
      <div className="w-[60%] bg-red-300 p-1 shadow-md rounded text-center flex justify-around cursor-pointer text-xl items-center gap-5">
        <input
          type="text"
          placeholder="Enter The Todo"
          className="rounded p-1 min-w-[50%] text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {togglebtn ? (
          <GrAdd onClick={itemsAdd} />
        ) : (
          <AiFillEdit
            className="text-orange-500 min-w-[2rem]"
            onClick={itemsAdd}
          />
        )}
      </div>
      <div className="w-[60%]">
        {item?.map((ele, ind) => {
          return (
            <div
              key={ind}
              className="p-1 my-2 rounded-md bg-zinc-700 text-orange-300 w-[100%] text-center flex flex-col justify-evenly items-center text-xl gap-2 md:flex-row"
            >
              <h3 className="text-justify">{ele.name}</h3>
              <AiFillEdit
                className="text-orange-500 min-w-[2rem]"
                onClick={() => handleEdit(ele.id)}
              />
              <AiFillDelete
                className="text-red-500 min-w-[2rem]"
                onClick={() => handleDelete(ele.id)}
              />
            </div>
          );
        })}
      </div>
      <button
        className="p-1 rounded-sm bg-orange-400 hover:bg-amber-700 cursor-pointer my-1"
        onClick={() => deleteAll()}
      >
        Delete All Todos
      </button>
    </div>
  );
};

export default App;
