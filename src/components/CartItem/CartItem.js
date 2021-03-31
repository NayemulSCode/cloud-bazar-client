import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const CartItem = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    //order start
    const handleOrderSubmit = data =>{
        const orderDetails = {...loggedInUser, ...cartProduct, orderTime: new Date()}
        fetch('http://localhost:5000/addOrder',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data =>{
            if(data){
                alert('Your order added successful!')
            }
        })
    }
    ///order end
    const {id} = useParams();
    const [product, setProduct]= useState([]);
    const cartProduct = product.find(carId => carId._id == id)
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])
    return (
        <div>
            <h1>Checkout</h1>
            <h4> {cartProduct?.name} <span> &#2547; {cartProduct?.price}</span></h4>
            <button type="submit" onClick={handleOrderSubmit}>Proceed To Checkout</button>
        </div>
    );
};

export default CartItem;