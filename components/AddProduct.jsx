import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import supabase from '../src/supabase'

const AddProduct = ({fetchProducts}) => {
    const [product,setProduct] = useState({title:"",qty:"",price:"",description:""})
    const handleInput = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const submitForm = async(e)=>{
        e.preventDefault()
        const {error} = await supabase.from('products').insert([{...product}]).select()
        if(error){
            alert(error)
        }else{
            alert("Product added successfully")
            setProduct({title:"",qty:"",price:"",description:""})
            fetchProducts()
        }
    }
  return (
    <form className='form' onSubmit={submitForm}>
        <h1>Add Products</h1>
      <TextField name='title' placeholder='Enter Title' value={product.title} onChange={(e)=>{handleInput(e)}}/>
      <TextField name='qty' placeholder='Enter Qty' value={product.qty} onChange={(e)=>{handleInput(e)}}/>
      <TextField name='price' placeholder='Enter Price' value={product.price} onChange={(e)=>{handleInput(e)}}/>
      <TextField name='description' placeholder='Enter Description' value={product.description} onChange={(e)=>{handleInput(e)}}/>
    <Button variant='contained' type='submit' >Submit</Button>
    </form>
  )
}

export default AddProduct
