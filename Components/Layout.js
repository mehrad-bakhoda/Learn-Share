import Loading from "./General/Loading";
import Menu from "./Menu/Menu";

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      <Loading state="loaded"/>
      <main>{children}</main>
    </>
  );
}
