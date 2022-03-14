import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUser } from "../../app/features/tokenSlice";

const SignInPage = ({ path }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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

    const data = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 409) throw new Error("Please use other email");
        if (res.status === 400) throw new Error("Fill the fields correctly");
        if (res.status === 406) throw new Error("Couldn't create your account");
        return res.json();
      })
      .then((data) => {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setUser(data.user));
        router.replace(path);
      })
      .catch((e) => {
        return console.log(e);
      });
  };
  return (
    <div className="innerPage loginPage">
      <div className="container-fluid">
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
          <input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="confirm password"
            type="password"
            name="passwordConfirmation"
          ></input>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
export async function getServerSideProps(context) {
  if (context.req.headers.referer) {
    return {
      props: {
        path: context.req.headers.referer,
      },
    };
  } else {
    return {
      props: {
        path: "/",
      },
    };
  }
}
