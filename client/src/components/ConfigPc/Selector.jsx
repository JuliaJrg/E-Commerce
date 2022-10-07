import { useState } from 'react'
import Products from '../Product/Products'

function Selector(props) {
    switch (props.selected) {
        case "motherboard":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>
                </section>
            );
            break;

        case "CPU":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>
                </section>
            );
        case "GPU":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>
                </section>
            );
        case "RAM":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>
                </section>
            );
        case "cooling":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>

                </section>
            );
        case "power":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>

                </section>
            );
        case "storage":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>

                </section>
            );
        case "case":
            return (
                <section class='product-selection'>
                    <h1>{props.selected}</h1>
                    <Products category={props.selected}></Products>

                </section>
            );
        default:
            return (
                <section class='product-selection'>
                    <p>Selectionner une catégorie</p>
                </section>
            );
            break;
    }
}

export default Selector;
