import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { Redirect } from 'react-router';

const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const productData ={
            name: data.name,
            imageUrl: imageUrl,
            weight: data.weight,
            price: data.price
        };
        const url = `https://apricot-sundae-20882.herokuapp.com/addProduct`;
        fetch(url,{
            method:'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res =>{
            alert('Product Added Successfully!!');
            console.log('product added response from server', res);
        })
        console.log(data)
    };
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileSubmit =event=>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key','d60c20098f8667cefc75a46c9a47fdff');
        imageData.append('image',event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div>
            <h3>add product</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
               <p>Product Name: <input name="name" defaultValue="Simple Product" ref={register} /></p>
                
                <p>Wight: <input name="weight" defaultValue="1kg" ref={register} /></p>
             
                <p>Price: <input name="price" defaultValue="200" ref={register} /></p>
                
                <p>Upload Photo: <input name="exampleRequired" type="file" onChange={handleFileSubmit}/>
                {errors.exampleRequired && <span>This field is required</span>}
                </p>
                <input type="submit" />
            </form>
        
        </div>
    );
};

export default AddProduct;