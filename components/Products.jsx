import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react'
import supabase from '../src/supabase'
import { Button } from '@mui/material';
import AddProduct from './AddProduct';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Products = () => {
  const [products,setProducts]=useState([])
  async function fetchProducts(){
    const {data,error} = await supabase.from('products').select('*').order('id',{ascending:true})
    if(error){
      alert(error)
    }else{
      setProducts(data)
    }
  }
  const updateProduct = async(id, title)=>{
    let newTitle = ''
    if(title.includes('updated')){
      const arr = title.split("updated")
      newTitle = arr[0].trim()
    }else{
      newTitle = title + " updated"
    }
    const {data,error} = await supabase.from('products').update({title:newTitle}).eq('id',id).select()
    if(error){
      alert(JSON.stringify(error))
    }else{
      alert("Product updated successfully")
      fetchProducts()
    }
  }
  const deleteProduct = async(id)=>{
    try {
      const {error} = await supabase.from('products').delete().eq('id',id)
      if(error){throw error}
      alert("Product Deleted successfully")
      fetchProducts()
    } catch (error) {
      alert(error)
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div style={{width:"100% "}}>
      <div className='table'>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Title</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Qty</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell align='center'>{product.title}</StyledTableCell>
              <StyledTableCell align="center">{product.price} INR</StyledTableCell>
              <StyledTableCell align="center">{product.qty}</StyledTableCell>
              <StyledTableCell align="center">{product.description.slice(0,20)}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{updateProduct(product.id,product.title)}} variant='contained'>update</Button></StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{deleteProduct(product.id)}} variant='contained' color="error">delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <AddProduct fetchProducts={fetchProducts}/>
    </div>
  )
}

export default Products
