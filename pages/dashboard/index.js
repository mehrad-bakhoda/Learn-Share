import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useSWR from "swr";
import checkAuthClient from "../../functions/checkAuthClient";
import axios from "axios";

function Protected() {
  const [secret, setSecret] = useState(null);
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token.value);

  const fetcher = async () => {
    return await axios.get("/api/protectedRoute", {
      headers: {
        authorization: `Bearer ${token.accessToken}`,
      },
    });
  };

  const { data, error } = useSWR("/api/", fetcher);

  useEffect(() => {
    if (data) setSecret(data.data);
    if (error) setError(error);
    setLoading(false);
  }, [data, error]);

  const handleSubmit = (e) => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setUser(data.user));
    });
  };
  console.log("meow");
  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (isError) {
      return <div>NOT AUTHENTICATED</div>;
    } else {
      return (
        <div>
          Welcome to Dashboard
          <form onSubmit={handleSubmit}>
            <button type="submit">Log out</button>
          </form>
        </div>
      );
    }
  }
}

export default checkAuthClient(Protected);
