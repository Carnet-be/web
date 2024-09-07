import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { Main } from './Main';

const LoadingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default LoadingPage;
