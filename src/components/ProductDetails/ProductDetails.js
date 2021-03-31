import React from 'react';
import { useHistory } from 'react-router';
import './ProductDetails.css'
//material ui library
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const ProductDetails = ({product}) => {
    console.log(product._id)
    const history = useHistory();
    const handleCart= id =>{
        const url =`/cartItem/${id}`
        history.push(url)
    }
    return (
    <Card className="productCar"> 
        <CardActionArea>
            <CardMedia
            className="cardMedia"
            component="img"
            alt="sample product"
            image={product.imageUrl}
            title={product.name}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {/* description */} 
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="large" color="primary">
            {product.price} &#2547;
            </Button>
            <Button onClick={()=> handleCart(product._id)} size="large"  color="primary" className="buyButton">
            Buy Now
            </Button>
        </CardActions>
    </Card>
    );
};

export default ProductDetails;