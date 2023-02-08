import "../public/assets/fonts/fontawesome-pro-5.15.1-web-ulabs/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../styles/styles.scss";

import { useEffect, useState } from "react";
import { refreshToken } from "../functions/auth";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../app/features/tokenSlice";
import Head from "next/head";

import store from "../app/store";

import Layout from "../Components/Layout";
import Loading from "../Components/General/Loading";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await refreshToken().then((data) => {
        if (data.ok) {
          dispatch(setAccessToken(data.accessToken));
          dispatch(setUser(data.user));
        }
        setLoading(false);
      });
      setInterval(async () => {
        await refreshToken().then((data) => {
          if (data.ok) {
            dispatch(setAccessToken(data.accessToken));
            dispatch(setUser(data.user));
          }
        });
      }, 600000);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8"></meta>
        <title>Resource Finder</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
