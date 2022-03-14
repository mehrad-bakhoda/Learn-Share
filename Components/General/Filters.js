import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import CustomSelect from "./CustomSelect";

const Filters = ({ order, lang, searching, subscribe }) => {
  let timer = null;
  const router = useRouter();
  const [path, setPath] = useState(router.asPath);

  const orderOptions = ["مرتب سازی", "دنبال کنندگان", "تاريخ", "قيمت"];
  const langOptions = ["زبان", "فارسی", "انگلیسی"];
  const search = (e) => {
    if (e.target.value != " " || e.target.value != "") {
      clearTimeout(timer);
      timer = setTimeout(() => {
        router.push(path + `?query=${e.target.value}`);
      }, 1000);
    }
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("myParam");
    console.log(myParam);
    fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({
        data: email,
      }),
    });
  };

  return (
    <div className="filters">
      <div className="container-fluid">
        {searching && (
          <div className="search">
            <input name="searchedItem" onChange={search} type="text"></input>
            <i className="far fa-search"></i>
          </div>
        )}

        {lang && (
          <div className="lang">
            <CustomSelect options={langOptions} />
          </div>
        )}
        {order && (
          <div className="order">
            <CustomSelect options={orderOptions} />
          </div>
        )}
        {subscribe && (
          <div className="buttons">
            <button
              type="submit"
              onClick={handleSubscribe}
              className="subscribe"
            >
              دنبال کردن
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
