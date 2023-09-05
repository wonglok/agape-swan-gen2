// import { SessionProvider } from "next-auth/react";
import '../src-preview/css/global.css'
import Head from 'next/head'
export default function Page({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>SWAN</title>
      </Head>
      {/* <SessionProvider session={session}> */}
      <Component {...pageProps}></Component>
      {/* </SessionProvider> */}
    </>
  )
}
