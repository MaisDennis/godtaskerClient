import React from 'react';
import Proptypes from 'prop-types';
import { Wrapper } from './styles';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
// import { Container } from './styles';
export default function DefaultLayout( {children}) {
  return (
    <Wrapper><Header />{children}<Footer /></Wrapper>
  );
}
DefaultLayout.propTypes = {
  children: Proptypes.element.isRequired,
}
