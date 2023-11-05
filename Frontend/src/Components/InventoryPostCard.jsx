import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import { color,colorScheme, useToast } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { getProducts } from "../Redux/products/action";



const InventoryPostCard = (Data) => {
    const { accidents,buyers,km,name,originalPaint,registrationPlace,scratches,_id} = Data;
const [loader,setloader]=useState(false)
let token=localStorage.getItem("buycartoken")
    const url="https://buycar2.onrender.com/api/v1/cars" 
    
      const handleDelete = async (id) => {
        try {
          console.log("deleting");
          let res = await axios.delete(`${url}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
          setloader((pre)=>!pre)
        } catch (error) {
          console.log(error);
        }
      };
      
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(getProducts());
      }, [loader]);

  return (
 

    <Tr>
    <td>{name}</td>
    <td>{km} km</td>
    <td>{scratches}</td>
    <td>{originalPaint}</td>
    <td>{accidents}</td>
    <td>{buyers}</td>
    <td>{registrationPlace}</td>
   <td>
     <button id="edit"  >Edit</button>
   </td>
   <td>
      <button id="delete" onClick={()=>handleDelete(_id)}>Delete</button>
  
   </td>

    
              </Tr>
    
              
    
    
  )
}

export default InventoryPostCard

const Tr = styled.tr`
button{
  padding:  2px 15px 2px;
  border-radius: 5px;

}
#edit{
    background-color: #365b36;
    color: white;
}
#edit:hover{
    background-color: #318031;
    color: white;
}
#delete{
    
    background-color: #cc224f;
    color: white;

}
#delete:hover{
    
    background-color: #991538;
    color: white;

}
td{
  background-color: #eaeaea;
  border: 5px solid white;

}

`