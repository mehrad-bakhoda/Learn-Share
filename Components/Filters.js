import CustomSelect from "./CustomSelect";
// import axios from "axios";
// import { useEffect, useState } from "react";

const Filters = () => {
  const orderOptions = ["مرتب سازی", "ترتیب 1", "ترتیب 3"];
  const langOptions = ["زبان", "فارسی", "انگلیسی"];
  // const [term, setTerm] = useState("");

  return (
    <div className="filters">
      <div className="container-fluid">
        <div className="search">
          <input name="searchedItem" type="text"></input>
          <i className="far fa-search"></i>
        </div>
        <div className="type">
          <CustomSelect options={langOptions} />
        </div>
        <div className="order">
          <CustomSelect options={orderOptions} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
