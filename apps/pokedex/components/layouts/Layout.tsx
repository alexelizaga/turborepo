import { FC } from 'react';
import Head from 'next/head';
import { BcNavbar } from '../ui';


type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
  logo?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title, logo }) => {
  
  return (
    <>
      <Head>
        <title>{ title || 'Pokemon App'}</title>
        <meta name="author" content="BroCode" />
        <meta name="description" content={`${title} pokemon details`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`${title} pokemon details`} />
        <meta property="og:description" content={`${title} page`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      < BcNavbar logo={logo} />

      <main>
        { children }
      </main>

    </>
  )
}
