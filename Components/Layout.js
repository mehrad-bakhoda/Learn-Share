import Menu from './Menu'
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      <main>{children}</main>
      <Script src="../assets/js/menu.js" strategy="beforeInteractive"></Script>

    </>
  )
}