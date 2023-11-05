import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import { color,colorScheme, useToast } from '@chakra-ui/react';

const PostCard = (Data) => {
  const {year,name,price,availableColors,maxSpeed,mileage,power,name_id} = Data;
  // console.log(Data);

  // const [saved, setSaved] = useState(false);
  // const [liked, setLiked] = useState(like.includes(_id));
  // const [Like,setLike]=useState(like.length)
  const [data, setData] = useState({ ...Data });

  const storedData = localStorage.getItem("spicy_hall");
  let existingData = storedData ? JSON.parse(storedData) : [];

  const toast = useToast();
  const Url = "https://spicy-hall.onrender.com/recipes";

  // const check = (id) => {
  //   existingData.forEach((el) => {
  //     if (el._id === id) {
  //       console.log(true);
  //       setSaved(true);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   check(_id);
  // }, [data,Like]);

  // const handelSave = async () => {
  //   const isProductDuplicate = existingData.some((product) => product._id === _id);
  //   const newData = { ...data };

  //   if (!isProductDuplicate) {
  //     existingData.push(newData);
  //     localStorage.setItem("spicy_hall", JSON.stringify(existingData));
  //     setSaved(true);
  //     toast({
  //       title: 'Saved',
  //       description: 'Product has been added to saved.',
  //       status: 'success',
  //       position: 'top',
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   } else {
  //     existingData = existingData.filter((product) => product._id !== _id);
  //     localStorage.setItem("spicy_hall", JSON.stringify(existingData));
  //     setSaved(false);
  //     toast({
  //       title: 'Removed',
  //       description: 'Product has been removed from saved.',
  //       status: 'error',
  //       position: 'top',
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // };




  if (true) {
    return (
  


          <Tr>
<td>{name}</td>
<td>{year} </td>
<td>{price}</td>

<td>{availableColors}</td>
<td>{mileage}</td>
<td>{power}</td>
<td>{maxSpeed}</td>
{/* <td><Link to={"/:oem"}>oem</Link></td>
<td></td> */}

          </Tr>

          


 

    );
  }
};



export default PostCard;

const Tr = styled.tr`

td{
  background-color: #eaeaea;
  border: 5px solid white;
}

`