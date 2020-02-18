import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Link href="/a?id=1" as="/a/1">
          <Button>a</Button>
        </Link>
        <Link href="/test/b">
          <Button>b</Button>
        </Link>
      </header>
      {children}
    </>
  );
};

export default Layout;
