import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
