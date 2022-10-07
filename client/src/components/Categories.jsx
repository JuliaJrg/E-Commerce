import React from "react";
import { Link } from 'react-router-dom'

export const motherboard_img = require('../assets/carte-mere.png')
export const cpu_img = require('../assets/processeur.png')
export const gpu_img = require('../assets/GPU.png')
export const ram_img = require('../assets/ram.png')
export const watercooling_img = require('../assets/watercooling.png')
export const battery_img = require('../assets/alimentation.png')
export const stockage_img = require('../assets/ssd.png')
export const case_img = require('../assets/boitier.png')
export const mouse_img = require('../assets/souris.png')
export const keyboard_img = require('../assets/clavier.png')
export const screen_img = require('../assets/screen.png')
export const sound_img = require('../assets/casque.png')
export const pc_img = require('../assets/pc.png')
export const pc_portable_img = require('../assets/pcgamer.png')
export const other_img = require('../assets/other.png')

const categories = [
    { id: 1, name: 'Cartes mere', img: motherboard_img, alt: 'image d\'une carte mere gamer' },
    { id: 2, name: 'Processeurs', img: cpu_img, alt: 'image de plusieurs processeurs' },
    { id: 3, name: 'Cartes graphique', img: gpu_img, alt: 'image de plusieurs cartes graphique gaming' },
    { id: 4, name: 'RAM', img: ram_img, alt: 'image de barrettes de ram rgb' },
    { id: 5, name: 'Refroidissements', img: watercooling_img, alt: 'image d\'un systeme de refroidissement "water-cooling" rgb' },
    { id: 6, name: 'Alimentations', img: battery_img, alt: 'image d\'une alimentation de pc' },
    { id: 7, name: 'Stockages', img: stockage_img, alt: 'image d\'un disque dur "ssd"' },
    { id: 8, name: 'Boitiers', img: case_img, alt: 'image d\'un boitier de pc gamer' },
    { id: 9, name: 'Souris', img: mouse_img, alt: 'image d\'une souris gamer' },
    { id: 10, name: 'Claviers', img: keyboard_img, alt: 'image d\'un clavier gamer' },
    { id: 11, name: 'Ecrans', img: screen_img, alt: 'image d\'un écran gamer' },
    { id: 12, name: 'Sons', img: sound_img, alt: 'image d\'un casque gamer' },
    { id: 13, name: 'Pc pré-fait', img: pc_img, alt: 'image d\'un pc gamer' },
    { id: 14, name: 'Pc portables', img: pc_portable_img, alt: 'image d\'un pc portable gamer' },
    { id: 15, name: 'Autres', img: other_img, alt: 'image de matériels gamer' },
]
const Categories = () => {
    return (
        <div className="categories-container mx-3 py-3">
            <div className="container">
                <div className="title-container">
                    <h2>Categories</h2>
                </div>
                <div className="categories">
                    {categories.map((category) => (
                        <Link to={{  pathname:`/categories/${category.name}` }} state={{ category_name: category.name }} className="link">
                            <div className="category" key={category.id}>
                                <img src={category.img} alt={category.alt} />
                                <h4>{category.name}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories
