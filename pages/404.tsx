import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const classes = {
  wrapper: 'container mx-auto px-4 py-8 flex items-center',
  title: 'text-3xl mt-16 w-full text-center',
};

const Error404Page: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>404 - SecretLab</title>
      </Head>
      <div id="404Page" className={classes.wrapper}>
        <h1 className={classes.title}>404</h1>
      </div>
    </>
  );
};

export default Error404Page;
