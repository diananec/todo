import React, { useState } from "react";
import "./ToDo.css";

function ToDo(props) {
  const [checked, setChecked] = useState(false);
  const [editOrNot, setEditOrNot] = useState(false);
  const [editedValue, setEditedValue] = useState(props.item);

  const striked = () => {
    setChecked(!checked);
  };

  return (
    <div className="Wrap">
      {editOrNot ? (
        <div className="MainToDo">
          <input
            className="input"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            type="text"
          />
          <span
            onClick={() => {
              props.editI(props.index, editedValue);
              setEditOrNot(false);
            }}
          >
            Save
          </span>
        </div>
      ) : (
        <div className="MainToDo">
          <div className="MainToDo__Checkbox" onClick={striked}>
            {checked ? "✅" : "☐"}
          </div>
          <div
            className="MainToDo__text"
            style={{ textDecoration: checked ? "line-through" : "" }}
          >
            {props.item}
          </div>
          <div
            className="MainToDo__edit"
            onClick={() => {
              setEditOrNot(!editOrNot);
            }}
          >
            ✏️
          </div>
          <div
            className="MainToDo__delete"
            onClick={() => props.deleteI(props.item)}
          >
            🗑️
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDo;
