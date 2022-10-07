import { useState } from 'react'

function Filter(props) {

  // console.log(props.product[0].product_category.name)
  
  const [orderPrice, setOrderPrice] = useState("DESC")

  const [brand, setBrand] = useState('0')
  const [brandList, setBrandList] = useState('<div></div>')

  const [category, setCategory] = useState("none")

  const categorys = [
    ['mother_board', "Cartes mere"],
    ['processor', "Processeurs"],
    ['graphic_card', "Cartes graphique"],
    ['RAM', 'RAM'],
    ['cooling', "Refroidissements"],
    ['batterie', 'Alimentations'],
    ['storage', 'Stockages'],
    ['computer_case', "Boitiers"],
    ['mouse', "Souris"],
    ['keyboard', 'Claviers'],
    ['screen', 'Ecrans'],
    ['other', 'Autres'],
    ['sound', 'Sons'],
    ['pc', 'Pc pré-fait'],
    ['pc_portable', 'Pc portables']
  ]

  // const categoryOption = async () => {
  //   categorys.forEach(cat => {
  //     if (cat[0] == props.product[0]) {
  //       return cat[1]
  //     }
  //   })
  // }
  // console.log(categoryOption)


  function changeCat(e) {
    let temp = [];
    setCategory(e.currentTarget.value)
    const brandArr = [['mother_board', 'ASUS', 'MSI'], ['processor', 'INTEL', 'RADEON']]
    brandArr.forEach(element => {
      if (element[0] === e.currentTarget.value) {
        console.log(element + ' --- ' + e.currentTarget.value)
        element.forEach(elem => {
          if (elem !== e.currentTarget.value) {
            temp.push(elem)
          }
        });
      }
    });
    // console.log(temp)
    props.setFilter_category(e.currentTarget.value)
    setBrandList(temp)
    // console.log(temp)
  }

  function changeBrand(e) {
    setBrand(e.currentTarget.value)
  }

  function sortByPrice(e) {
    props.setFilter_price(e.currentTarget.value);
  }

  return (
    <section className="filter-container">
      <h2>Recherche avancée</h2>
      <div className='filter'>
        <div class='filter-section'>
          <h5>Trier par categories :</h5>
          <div class='filter-selector'>
            <select selected='null' onChange={changeCat}>
               <option selected="true" style={{display: 'none'}}></option>
              {categorys.map(e => {
                // console.log(e)
                return (
                  <option value={e[0]}>{e[1]}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div class='filter-section'>
          <h5>Trier par prix :</h5>
          <div class='filter-selector'>
            <select onChange={sortByPrice}>
              <option value=''>--ordre--</option>
              <option value='ASC'>Prix Croissant</option>
              <option value='DESC'>Prix Décroissant</option>
            </select>
          </div>
        </div>
        {category !== "none" && (
          <div class='filter-section'>
            <h5>Trier par marque :</h5>
            <div class='filter-selector'>
              <select onChange={changeBrand}>
                {brandList.map(e => {
                  console.log(e)
                  return (
                    <option value={e}>{e}</option>
                  )
                })}
              </select>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Filter;
