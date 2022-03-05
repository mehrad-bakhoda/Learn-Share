import CustomSelect from "./CustomSelect";

const Filters = () => {
  const orderOptions = ["مرتب سازی", "دنبال کنندگان", "تاريخ"];
  const langOptions = ["زبان", "فارسی", "انگلیسی"];

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
