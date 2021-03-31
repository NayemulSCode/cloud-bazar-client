import React, { useEffect, useState } from 'react';
import ProductDetails from '../ProductDetails/ProductDetails';

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data =>{
            setProducts(data);
            console.log(data);
        })
    },[])
    return (
        <div>
            <h3>home component</h3>
            {
                products.map( product => <ProductDetails product = {product}></ProductDetails>)
            }
        </div>
    );
};

export default Home;