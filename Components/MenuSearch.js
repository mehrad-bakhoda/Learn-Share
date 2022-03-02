const MenuSearch = () => {
  return (
    <div className="menuSearch">
      <form action="/api/search" method="POST">
        <input name="name" type="text"></input>
        <i className="far fa-search"></i>
        <div className="buttons">
          <button type="submit"> جستجو </button>
        </div>
      </form>
    </div>
  );
};

export default MenuSearch;
