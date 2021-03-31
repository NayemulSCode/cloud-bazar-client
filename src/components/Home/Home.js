import React, { useEffect, useState } from 'react';
import ProductDetails from '../ProductDetails/ProductDetails';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            <h3>Feature Products</h3>
            {
                
                products.length === 0 && <CircularProgress />
            
                
            }
            {
                products.map( product => <ProductDetails product = {product}></ProductDetails>)
            }
        </div>
    );
};

export default Home;