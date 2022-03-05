/* eslint-disable react/jsx-key */
import { useState } from "react";

const CustomSelect = (props) => {
  const options = props.options;
  const [custom, setCustom] = useState({
    selected: options[0],
    class: "options",
  });
  const choseOption = (option) => {
    setCustom({ selected: option, class: custom.class });
    toggleSelect();
  };
  const toggleSelect = () => {
    if (custom.class === "options")
      setCustom({ selected: custom.selected, class: "options opened" });
    else setCustom({ selected: custom.selected, class: "options" });
  };
  return (
    <div className="customSelect">
      <div className={custom.class}>
        <div className="selected">
          <p> {custom.selected} </p>
          <i className="far fa-line-height" onClick={toggleSelect}></i>
        </div>
        <ul className="others">
          {options.map((option, key) => {
            return (
              <li key={key}>
                <p onClick={() => choseOption(option)}>{option}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
