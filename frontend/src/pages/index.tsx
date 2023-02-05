import React from 'react'
import Main from 'components/pages/home/Main'
import MenuBar from 'components/pages/home/MenuBar'
import Head from 'next/head'

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Contacts</title>
      </Head>{' '}
      <div className="grid grid-rows-[auto] grid-cols-12 md:grid-rows-1">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13 md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-1 md:border-x-[0.0625rem] md:border-custom-gray-60 md:min-h-screen md:pt-24">
          <MenuBar
            iconType="back"
            imageProps={{
              width: 15.25,
              height: 15.25
            }}
            containerClassNames="justify-start md:justify-end pl-4 md:pr-9"
          />
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-13 md:col-start-4 md:col-end-10 md:row-start-1 md:row-end-1 md:pt-24">
          <Main />
        </div>
        <div className="row-start-1 row-end-2 col-start-1 col-end-13 md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-1 md:border-x-[0.0625rem] md:border-custom-gray-60 md:min-h-screen md:pt-24">
          <MenuBar
            iconType="light-mode"
            imageProps={{
              width: 21.5,
              height: 21.5
            }}
            containerClassNames="justify-end md:justify-start pr-4 md:pl-9"
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
