
const LoginPhone = (props) => {
    return (
        <div className="customCard loginCard">
            <h4>
                شماره تماس یا ایمیل خود را وارد کنید
            </h4>
            <div className="inputs">
                <input type="text"></input>
            </div>
            <div className="buttons">
                <button type="submit">
                    تایید
                </button>
            </div>
        </div>
    )
}

export default LoginPhone;