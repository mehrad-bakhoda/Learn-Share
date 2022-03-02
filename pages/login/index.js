import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUser } from "../../app/features/tokenSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token.accessToken !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token.accessToken]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/signIn", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((data) => {
      console.log("data");
      dispatch(setAccessToken(data.accessToken));
      dispatch(setUser(data.user));
    });
  };
  return (
    <div className="innerPage loginPage">
      <div className="container-fluid">
        {auth === true ? (
          <div>
            Hello {token.user.email}, you are authenticated so you can visit{" "}
            <Link href="/dashboard"> Dashboard</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              type="email"
              name="username"
            ></input>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              name="password"
            ></input>
            <button type="submit">Log In</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;