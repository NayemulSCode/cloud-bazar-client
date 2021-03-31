import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Order = () => {
    //for query with email
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/orders?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])
    return (
        <div>
            <h3>You have: {orders.length} Orders</h3>
            {
                orders.map(order =>
                    <li>Name:{order.name} Price:{order.price} Order Date: {new Date(order.orderTime).toDateString('dd/MM/yyyy')}</li>
                )
            }
        </div>
    );
};

export default Order;