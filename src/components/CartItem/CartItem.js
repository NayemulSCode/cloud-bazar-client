import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './Cart.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const CartItem = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    //order start
    const handleOrderSubmit = () =>{
        const orderDetails = {...loggedInUser, ...cartProduct, orderTime: new Date()}
        fetch('https://apricot-sundae-20882.herokuapp.com/addOrder',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
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
        fetch('https://apricot-sundae-20882.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])
    return (
        <div>
            <h1>Checkout</h1>
            <TableContainer component={Paper}>
                    <Table className="" aria-label="spanning table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>
                            CheckOut Details
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            <TableRow key={cartProduct?.id}>
                            <TableCell>{cartProduct?.name}</TableCell>
                            <TableCell align="right">1</TableCell>
                            <TableCell align="right"> &#2547; {cartProduct?.price}</TableCell>
                            </TableRow>

                       <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell align="right" colSpan={1}>Total</TableCell>
                            <TableCell align="right">{cartProduct?.price}&#2547;</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>

            <Button className="checkoutBtn" type="submit" onClick={handleOrderSubmit}>Proceed To Checkout</Button>
        </div>
    );
};

export default CartItem;