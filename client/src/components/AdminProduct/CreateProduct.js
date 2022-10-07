import { useState } from "react";

function CreateProduct() {
    const [message, setMessage] = useState(null);
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [stocks, setStocks] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [sale_id, setSale_id] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeImg = (event) => {
        setImg(event.target.value);
    };
    const handleChangeBrand = (event) => {
        setBrand(event.target.value);
    };
    const handleChangeDesc = (event) => {
        setDescription(event.target.value);
    };
    const handleChangeStocks = (event) => {
        setStocks(event.target.value);
    };
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory_id(event.target.value);
    };
    const handleChangeSale = (event) => {
        setSale_id(event.target.value);
    };
    const handleSubmit = async (event) => {
        const data = JSON.stringify({
            name: name,
            img: img,
            brand: brand,
            description: description,
            stocks: stocks,
            price: price,
            category: category_id,
            sale_id: sale_id,
        });
        const response = await fetch("http://localhost:4242/admin-product", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        console.log(response.status);
        if (response.ok) {
            setMessage(true);
        }
    };
    return (
        <div className="create-container">
            <div className="container mx-3 py-3"> 
                <div className="content">
                    <div className="title-container">
                        <h2>Ajouter des produits</h2>
                    </div>
                    <form className="subscribe-container" onSubmit={handleSubmit}>
                        <input
                            label="Nom du produit"
                            name="product_name"
                            placeholder="Nom"
                            onChange={handleChangeName}
                        ></input>
                        <input
                            label="Image URL du produit"
                            name="product_name"
                            placeholder="URL de l'image"
                            onChange={handleChangeImg}
                        ></input>
                        <input
                            label="Marque du produit"
                            name="product_name"
                            placeholder="Marque"
                            onChange={handleChangeBrand}
                        ></input>
                        <input
                            label="Description du produit"
                            name="product_name"
                            placeholder="Description"
                            onChange={handleChangeDesc}
                        ></input>
                        <input
                            label="Nombre de stocks"
                            type="number"
                            name="product_name"
                            placeholder="Stocks"
                            onChange={handleChangeStocks}
                        ></input>
                        <input
                            label="Prix du produit"
                            type="number"
                            name="product_name"
                            placeholder="Prix en €"
                            onChange={handleChangePrice}
                        ></input>
                        <input
                            label="Categorie du produit"
                            name="product_name"
                            placeholder="Catégorie"
                            onChange={handleChangeCategory}
                        ></input>
                        <input
                            label="Promotion du produit"
                            name="product_name"
                            placeholder="Promotion"
                            onChange={handleChangeSale}
                        ></input>
                        <button onClick={handleSubmit} color="primary">
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
