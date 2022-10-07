import { useState, useEffect } from 'react'
import Products from '../Product/Products';

function Hardware_recap(props) {

  const [selection, setSelection] = useState("none")
  const [price, setPrice] = useState(0)

  // useEffect(() => {


  // }, [props.cart]);
  setInterval((e) => {
    return (
      <section class='hardware-recap'>
        <h1 class='hardware-recap-title'>Récapitulatif</h1>
        {console.log(props.cart)}
        <Products type={'recap'} hasCart={true} cart={props.cart} />
      </section>
    );
  }, 1)

  return (
    <section class='hardware-recap'>
      <h1 class='hardware-recap-title'>Récapitulatif</h1>
      {console.log(props.cart)}
      <Products type={'recap'} setPrice={setPrice} hasCart={true} cart={props.cart} />
      <h2>Prix total: {price} €</h2>
    </section>
  );
}

export default Hardware_recap;
