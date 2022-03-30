const Info = ({ state, handleExit, phoneNumber, email, handleUpdate }) => {
  return (
    <div className={`info ${state ? "shown" : "hidden"}`}>
      <form onSubmit={handleUpdate}>
        <div className="inputs">
          <div className="inputRow">
            <label>شماره تماس</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber ? phoneNumber : ""}
            />
          </div>
          <div className="inputRow">
            <label>ایمیل</label>
            <input type="email" name="email" value={email ? email : ""} />
          </div>
          <div className="inputRow">
            <label>رمز عبور</label>
            <input type="password" name="password" />
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="save">
            ذخیره
          </button>
          <button className="dismiss">لغو</button>
        </div>
      </form>
      <div className="buttons">
        <form onSubmit={handleExit}>
          <button type="submit" className="logout">
            خروج
          </button>
        </form>
      </div>
    </div>
  );
};

export default Info;
