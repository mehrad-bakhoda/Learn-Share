const Info = ({ state, handleExit, phoneNumber, email }) => {
  return (
    <div className={`info ${state ? "shown" : "hidden"}`}>
      <form>
        <div className="inputs">
          <div className="inputRow">
            <label>شماره تماس</label>
            <input type="text" value={phoneNumber ? phoneNumber : ""} />
          </div>
          <div className="inputRow">
            <label>ایمیل</label>
            <input type="email" value={email ? email : ""} />
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
