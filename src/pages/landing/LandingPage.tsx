import React from 'react';
import Footer from './Footer';
import { Header } from './Header';
import { Main } from './Main';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default LandingPage;
