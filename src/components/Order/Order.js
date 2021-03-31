import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Order = () => {
    //for query with email
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/orders?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])
    // table material ui start
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        const product = orders[i];
        total = total + parseFloat(product.price);
        console.log(total);
        
    }
    return (
        <div>
            <h3>You have: {orders.length} Orders</h3>
            
                    <div>
                    <TableContainer component={Paper}>
                    <Table className="" aria-label="spanning table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>
                            Order Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                            <TableCell>{order.name}</TableCell>
                            <TableCell align="right">1</TableCell>
                            <TableCell align="right">{order.weight}</TableCell>
                            <TableCell align="right">{new Date(order.orderTime).toDateString('dd/MM/yyyy')}</TableCell>
                            <TableCell align="right">&#2547;{(order.price)}</TableCell>
                            </TableRow>
                        ))}

                       <TableRow>
                            <TableCell rowSpan={4} />
                            <TableCell align="right" colSpan={3}>Total=</TableCell>
                            <TableCell align="right">{total}&#2547;</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
        </div>
    );
};

export default Order;