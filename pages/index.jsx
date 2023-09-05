// import { Preview } from "src-preview/Preview";
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Yo</title>
      </Head>
      Landing Page
      <br />
      <a className='block' href={`/preview`}>
        1. Preview Component Page
      </a>
      <a className='block' href={`/admin-portal`}>
        2. Admin Portal Page
      </a>
      <a className='block' href={`/blender`}>
        3. Blender Livelink
      </a>
      {/* <Preview></Preview> */}
    </>
  )
}

//
