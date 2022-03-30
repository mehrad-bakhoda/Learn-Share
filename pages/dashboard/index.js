import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verify } from "jsonwebtoken";
import cookie from "cookie";
import { prisma } from "../../lib/prisma";
import superjson from "superjson";

import useSWR from "swr";
import checkAuthClient from "../../functions/checkAuthClient";
import axios from "axios";
import Loading from "../../Components/General/Loading";
import Dashboard from "../../Components/Dashboard/Dashboard";

function Protected({ phoneNumber, email }) {
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

  const handleExit = (e) => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setUser(data.user));
    });
  };
  if (loading) {
    return <Loading />;
  } else {
    if (isError) {
      return <div>NOT AUTHENTICATED</div>;
    } else {
      return (
        <div className="dashboardPage">
          <Dashboard
            handleExit={handleExit}
            phoneNumber={phoneNumber}
            email={email}
          />
        </div>
      );
    }
  }
}

export default checkAuthClient(Protected);

export async function getServerSideProps({ req }) {
  if (req.headers.cookie) {
    const getToken = cookie.parse(req.headers.cookie);
    const token = getToken.refreshToken;
    let payload = null;
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (user) {
      return {
        props: {
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      };
    }
  }
  return {
    destination: "login",
  };
}
