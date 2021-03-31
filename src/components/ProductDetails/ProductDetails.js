import React from 'react';
import { useHistory } from 'react-router';

const ProductDetails = ({product}) => {
    console.log(product._id)
    const history = useHistory();
    const handleCart= id =>{
        const url =`/cartItem/${id}`
        history.push(url)
    }
    return (
        <div>
            <img style={{height:'200px'}} src={product.imageUrl} />
            <h3>{product.name} <span>{product.weight}</span></h3>
            <div>
                <h3>{product.price}</h3>
                <button onClick={()=> handleCart(product._id)} >Buy Now</button>
            </div>
        </div>
    );
};

export default ProductDetails;