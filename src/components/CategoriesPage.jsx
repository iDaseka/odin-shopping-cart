/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import {addToCart} from "./ShoppingCart";
import '../styles/CategoriesPage.css'

const baseFetch = "https://api.mercadolibre.com/sites/MLA/search?category=";

const CategoriesPage = ({cartItems, setCartItems}) => {
    const {categoryId} = useParams();
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts(categoryId);
    }, [categoryId]);

    const getProducts = async (categoryId) => {
        const promises = [];
        const fetchedProducts = [];
        for (let i = 0; i < 20; i++) {
            promises.push(fetch(baseFetch + categoryId));
        }

        const responses = await Promise.all(promises);

        for (const response of responses){
            const data = await response.json();
            fetchedProducts.push(data);
        }

        setProducts(fetchedProducts);
    }

    return (
        <div id="productsContainer">
            {products.map((product, index) => (
                <div key={index} id="productCard">
                    <img id="productImage" src={product.results[index].thumbnail}/>
                <div id="productText">
                    <p id="productName">
                        {product.results[index].title}
                    </p>
                    <div id="buyContainer">
                        <p id="productPrice">${product.results[index].price}</p>
                        <button id="productBuy" onClick={() => 
                            addToCart({title: product.results[index].title, price: product.results[index].price, thumbnail: product.results[index].thumbnail}, 1, cartItems, setCartItems)}
                        >Add to cart</button>
                    </div>
                    </div> 
                </div>
            ))}
        </div>
    );
};

export default CategoriesPage;