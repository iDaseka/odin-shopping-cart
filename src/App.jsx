import {Routes, Route, Link} from 'react-router-dom';
import MainPage from './components/MainPage';
import CategoriesPage from './components/CategoriesPage';
import ShoppingCart from './components/ShoppingCart';
import cartImage from './assets/shopping-cart.svg';
import {useState} from'react';
import './App.css';

const categories = [
    {id: "MLA1368", name: "Arts, Crafts & Sewing"},
    {id: "MLA1743", name: "Cars, Motorcycles & Others"},
    {id: "MLA1246", name: "Beauty and Personal Care"},
    {id: "MLA1648", name: "Smartphones"},
    {id: "MLA1144", name: "Consoles & Video Games"}
];

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    return(
        <div id='page'>
            <div id='mainTab'>
                <MainPage />
                <Link to="/cart">
                    <button id='cartButton'>
                        <img src={cartImage} id='cart'/>
                    </button>
                </Link>
            </div>
            <nav>
                <div id='category-options'>
                    {categories.map((category) => (
                        <p key={category.id}>
                            <Link to={`/category/${category.id}`}>{category.name}</Link>
                        </p>
                    ))}

                </div>
            </nav>

            <Routes>
                <Route path="/category/:categoryId" element={<CategoriesPage cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/cart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems}/>} />
            </Routes>
        </div>
    )
}



export default App
