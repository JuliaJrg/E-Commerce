import { useState } from "react";
import ProductInfos from "../components/AdminProduct/Products";
import CreateProduct from "../components/AdminProduct/CreateProduct";


function AdminProductPage() {
    const [value, setValue] = useState(0);

    const TabPanel = (props) => {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && (
                    <div>
                        <h1>{children}</h1>
                    </div>
                )}
            </div>
        );
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <div>
                <div className="tab"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <div label="Infos Produits" />
                    <div label="Créer un Produit" />
                    {/* <Tab label="User Paiements" /> */}
                </div>
            </div>
            <div value={value} index={0}>
                <ProductInfos />
            </div>
            <div value={value} index={1}>
                <CreateProduct />
            </div>
        </div>
    );
}

export default AdminProductPage;