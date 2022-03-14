const Info = ({state}) => {
  return (
    <div className={`info ${state ? "shown" : "hidden"}`}>
    <form>
        <div className="inputs">
          <div className="inputRow">
            <label>شماره تماس</label>
            <input type="text" />
          </div>
          <div className="inputRow">
            <label>ایمیل</label>
            <input type="email" />
          </div>
          <div className="inputRow">
            <label>رمز عبور</label>
            <input type="password" />
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="save">
            ذخیره
          </button>
          <button type="submit" className="dismiss">
            لغو
          </button>
        </div>
      </form>
      <div className="buttons">
        <button type="submit" className="logout">
          خروج
        </button>
      </div>
    </div>
  );
};

export default Info;
