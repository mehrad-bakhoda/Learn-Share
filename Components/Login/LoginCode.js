
const LoginCode = (props) => {
    return (
        <div className="customCard loginCard">
            <h4>
                 کد ارسال شده را وارد کنید
            </h4>
            <div className="inputs">
                <input type="text"></input>
            </div>
            <div className="buttons">
                <button type="submit">
                    تایید
                </button>
                <a href="#">
                    ویرایش 
                </a>
            </div>
        </div>
    )
}

export default LoginCode;