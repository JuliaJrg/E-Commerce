import { useState, useEffect } from "react";

function ProductInfos() {
    const [products, setProducts] = useState(null);
    const [btnRegister, setBtnRegister] = useState(true);
    const [id, setId] = useState([]);
    const [name, setName] = useState([]);
    const [img, setImg] = useState([]);
    const [brand, setBrand] = useState([]);
    const [description, setDescription] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [price, setPrice] = useState([]);
    const [category_id, setCategory_id] = useState([]);
    const [sale_id, setSale_id] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const formByUser = [];
    let listElementFields = [];
    useEffect(() => {
        const getFields = async () => {
            // Get nb Fields
            const response = await fetch("http://localhost:4242/product/", {
                method: "get",
            });
            if (response.ok) {
                const productJson = await response.json();
                setProducts(productJson);
            }
        };
        getFields();
    }, []);
    const handleChangeName = (event, i) => {
        name[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangeImg = (event, i) => {
        img[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangeBrand = (event, i) => {
        brand[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangeDescription = (event, i) => {
        description[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangeStocks = (event, i) => {
        stocks[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangePrice = (event, i) => {
        price[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangeCategorieId = (event, i) => {
        category_id[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };
    const handleChangeSaleId = (event, i) => {
        sale_id[i] = event.target.value;
        if (
            (name[i] != "" && name[i]) ||
            (img[i] != "" && img[i]) ||
            (brand[i] != "" && brand[i]) ||
            (description[i] != "" && description[i]) ||
            (stocks[i] != "" && stocks[i]) ||
            (price[i] != "" && price[i]) ||
            (category_id[i] != "" && category_id[i]) ||
            (sale_id[i] != "" && sale_id[i])
        ) {
            setBtnRegister(false);
        } else {
            setBtnRegister(true);
        }
    };

    const handleSubmit = async (event, i) => {
        event.preventDefault();
        const data = JSON.stringify({
            id: id[i],
            name: name[i],
            img: img[i],
            brand: brand[i],
            description: description[i],
            stocks: stocks[i],
            price: price[i],
            category_id: category_id[i],
            sale_id: sale_id[i],
        });
        const sendInfo = await fetch("http://localhost:4242/admin-product", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        if (sendInfo.ok) {
            console.log(sendInfo.status);
        }
    };
    const handleClickOpenModal = () => {
        setOpenModal(true);
    };
    const handleClickCloseModal = () => {
        setOpenModal(false);
    };
    const handleClickDelete = async (event, i) => {
        await fetch("http://localhost:4242/admin-product", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id[i],
            }),
        });
        setOpenModal(false);
    };
    if (products) {
        for (let i = 0; i < products.length; i++) {
            id.push(products[i].id);
        }
        const productInfos = products.map((product, i) => {
            // Will list user objects
            listElementFields = Object.keys(product).map((element) => {
                if (element === "img") {
                    return (
                        <div className="admin">
                            <div className="admin">
                                <img className="img_admin"
                                src={product[element]}
                                alt="produit">
                                </img>
                            </div>

                            <input 
                            label={'Image URL'}
                            name={element}
                            placeholder={"URL de l'image"}
                            onChange={(event) => handleChangeImg(event, i)}></input>
                        </div>
                    );
                } else if (element === "id") {
                    return (
                        <input
                            label='ID Product'
                            name={element}
                            placeholder={product[element]}
                            value={product[element]}
                        ></input>
                    );
                } else if (element === "name") {
                    return (
                        <input
                        label={product[element]}
                        name={element}
                        placeholder={'Nom du produit'}
                        onChange={(event) => handleChangeName(event, i)}
                        ></input>
                    );
                } else if (element === "brand") {
                    return (
                        <input
                            label={product[element]}
                            name={element}
                            placeholder={"Marque du produit"}
                            onChange={(event) => handleChangeBrand(event, i)}
                        ></input>
                    );
                } else if (element === "description") {
                    return (
                        <div className="description">
                            <p>
                                <u>Description du produit</u> :{" "}
                                {product[element]}
                            </p>
                            <input

                                label="Description"
                                name={element}
                                placeholder={"Modifier"}
                                onChange={(event) =>
                                    handleChangeDescription(event, i)
                                }
                            ></input>
                        </div>
                    );
                } else if (element === "stocks") {
                    return (
                        <input
                            label={product[element]}
                            name={element}
                            type="number"
                            placeholder={"Nombre stock"}
                            onChange={(event) => handleChangeStocks(event, i)}
                        ></input>
                    );
                } else if (element === "price") {
                    return (
                        <input
                            label={product[element]}
                            name={element}
                            placeholder={"Prix en €"}
                            onChange={(event) => handleChangePrice(event, i)}
                        ></input>
                    );
                } else if (element === "category_id") {
                    return (
                        <input
                            label={product[element]}
                            name={element}
                            placeholder={"ID Catégorie"}
                            onChange={(event) =>
                                handleChangeCategorieId(event, i)
                            }
                        ></input>
                    );
                } else if (element === "sale_id") {
                    return (
                        <input
                            label={
                                product[element]
                                    ? product[element]
                                    : "Aucune promotion ajoutée"
                            }
                            name={element}
                            placeholder={"ID sale"}
                            onChange={(event) => handleChangeSaleId(event, i)}
                        ></input>
                    );
                }
            });
            formByUser.push(
                <div className="form_container">
                    <div className="container mx-3 py-3">
                        <div className="content">
                            <div className="title-container">
                                <h2>Modifier le produit</h2>
                            </div>
                            <form className="subscribe-container" onSubmit={(event) => handleSubmit(event, i)}>
                                {listElementFields}
                                <div className="btn_container">
                                    <button type="submit" disabled={btnRegister}>
                                        Enregistrer
                                    </button>
                                    <button onClick={handleClickOpenModal} >
                                        Supprimer
                                    </button>
                                </div>
                            </form>


                            {/* <div className="modal"
                                open={openModal}
                                onClose={handleClickCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <div>
                                    <h2>
                                        <p>
                                            Vous vous apprêtez à supprimer:{" "}
                                        </p>
                                        <button
                                            color="danger"
                                            onClick={(event) =>
                                                handleClickDelete(event, i)
                                            }
                                        >
                                            Supprimer
                                        </button>
                                    </h2>
                                    <h2>
                                        <button onClick={handleClickCloseModal}>
                                            Annuler
                                        </button>
                                    </h2>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            );
        });
    }
    return (
        <div container spacing={4}>
            {formByUser}
        </div>
    );
}

export default ProductInfos;
