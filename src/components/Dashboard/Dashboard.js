import React,{useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
 
const Dashboard = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
       fetch('http://localhost:5000/products')
       .then(res => res.json())
       .then(data => setProduct(data))
    }, [])
    //single product load

    //delete product
    const handleDeleteProduct = id =>{
      console.log('button clicked')
      fetch(`http://localhost:5000/products/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(result =>{
        if(result){ 
          setProduct( product.filter((pd) => pd._id !== id))
        }
        alert('deletion successfully!');
      })
    }
    return (
        <div>
            <h3>Dashboard</h3>
            {
              product.length === 0 && <CircularProgress />
            }
            <TableContainer component={Paper}>
                <Table className={useStyles} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Product Name</StyledTableCell>
                        <StyledTableCell align="right">Unit Weight</StyledTableCell>
                        <StyledTableCell align="right">Price(&#2547; )</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {product.map((pd) => (
                        <StyledTableRow key={pd._id}>
                        <StyledTableCell component="th" scope="row">
                            {pd.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{pd.weight}</StyledTableCell>
                        <StyledTableCell align="right">{pd.price}</StyledTableCell>
                        <StyledTableCell align="right">
                            <Button variant="contained" color="primary">
                                Edit
                            </Button>
                            <Button onClick={ ()=> {handleDeleteProduct(pd._id)}} variant="contained" color="secondary">
                                Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Dashboard;