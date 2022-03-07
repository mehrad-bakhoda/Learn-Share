/* eslint-disable react/jsx-key */
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const CustomSelect = (props) => {
  const router = useRouter();

  const options = props.options;
  const [custom, setCustom] = useState({
    selected: options[0],
    class: "options",
  });
  const [path, setPath] = useState(router.asPath);

  const choseOption = (option) => {
    setCustom({ selected: option, class: custom.class });
    toggleSelect();
    if (router.query.sort_by && router.query.language) {
      if (option == "انگلیسی" || option == "فارسی") {
        const sortBy = router.query.sort_by;
        router.push(path + `?language=${option}&sort_by=${sortBy}`, undefined);
      }
      if (option == "دنبال کنندگان" || option == "تاريخ" || option == "قيمت") {
        const language = router.query.language;

        router.push(
          path + `?language=${language}&sort_by=${option}`,
          undefined
        );
      }
    } else {
      if (router.query.language) {
        if (option == "انگلیسی" || option == "فارسی") {
          router.push(path + `?language=${option}`, undefined);
        }
        if (
          option == "دنبال کنندگان" ||
          option == "تاريخ" ||
          option == "قيمت"
        ) {
          router.push(router.asPath + `&sort_by=${option}`, undefined);
        }
      } else {
        if (router.query.sort_by) {
          if (
            option == "دنبال کنندگان" ||
            option == "تاريخ" ||
            option == "قيمت"
          ) {
            router.push(path + `?sort_by=${option}`, undefined);
          }
          if (option == "انگلیسی" || option == "فارسی") {
            router.push(router.asPath + `&language=${option}`, undefined);
          }
        } else {
          if (
            option == "دنبال کنندگان" ||
            option == "تاريخ" ||
            option == "قيمت"
          ) {
            router.push(router.asPath + `?sort_by=${option}`, undefined);
          }
          if (option == "انگلیسی" || option == "فارسی") {
            router.push(router.asPath + `?language=${option}`, undefined);
          }
        }
      }
    }
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
