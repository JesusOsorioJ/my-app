import Footer from '../components/Footer';
import Header from '../components/Header';
import FormNote from '../components/FormNote';
import { useEffect, useState } from 'react';

function Teacher(){
    const id = "CfAgqIA4xVjszP2xUX1P-3e23e23e5tt6y665y"
 return(
     <>
      <Header />
      <FormNote id={id} />
      <Footer />
     </>
 )
}
export default Teacher