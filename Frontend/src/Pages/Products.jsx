import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../Css/Products.module.css";
import axios from "axios";
import PostCard from "../Components/PostCard";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOEMProducts, getProducts } from "../Redux/products/action";
import { CircularProgress, CircularProgressLabel, Toast, useToast } from "@chakra-ui/react";
const Products = () => {
  const posts = useSelector((store) => store.productReducer.OEMData);
  const [filterData, setFilterData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
  // console.log(posts);
  const [pages, setPages] = useState(1);
  const Url = "https://buycar2.onrender.com/api/v1";
  const [searchParams] = useSearchParams();

  let obj = {
    params: {
      material: searchParams.getAll("material"),
      _sort: "currentprice",
      _order: searchParams.get("order"),
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOEMProducts());
  }, []);

  // useEffect(() => {
  //   dispatch(getProducts(pages));
  // }, [searchParams]);

const toast=useToast()
  useEffect(() => {
    if (posts?.length !== 0) {

      setFilterData([...posts]);
      setOriginalData(posts);
    }
  }, [posts]);

  useEffect(() => {});
  const genres = ["asc","desc"];
  const ratingOptions = [1, 2, 3, 4, 4.5];

  const handelGenre = (e) => {
    setSelectedGenre(e.target.value);
    let newData;
    if (e.target.value == "") {
      newData = [...posts];
    } else {
      newData = originalData.filter((el) => el.category === e.target.value);
    }
    setFilterData(newData);
  };
  const handleSort = (e) => {
    const sortValue = e.target.value;
    console.log(e.target.value)
    let newData = [...filterData];
  
    if (sortValue === "asc") {
      newData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
      newData.sort((a, b) => b.price - a.price);
    }
  
    setFilterData(newData);
  };
  
  const handleDateSort = (e) => {
    setTimeout(()=>{
      const sortValue = e.target.value;
      console.log(e.target.value)
      let newData = [...filterData];
    
      if (sortValue === "asc") {
        newData.sort((a, b) => a.year - b.year);
      } else if (sortValue === "desc") {
        newData.sort((a, b) => b.year - a.year);
      }
    
      setFilterData(newData);
    },800)

  };
  const handelRating = (e) => {
    setSelectedRating(e.target.value);
    let newData = originalData.filter(
      (el) => el.rating >= parseInt(e.target.value)
    );
    setFilterData(newData);
  };

  const filteredMovies = (e) => {
    console.log(e.target.value)
    setSearchText(e.target.value);
    if (e.target.value === "") {
      console.log("clearing")
      setFilterData((pre)=>[...posts]);
      // dispatch(getProducts());
    getProducts()
    } else {
  
      const newData = filterData?.filter((car) =>
        car.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
console.log("running")
      //       const newData = filterData.filter((car) =>{
      //         console.log(car.name.toLowerCase()==e.target.value.toLowerCase())
      //  return  car.name.toLowerCase()==e.target.value.toLowerCase()
      //       }
      // );
      setFilterData(newData);
      if(newData.length==0){
        toast({
          title: "Sorry😥!! ",
          description: `no prducts found with this name`,
          status: "warning",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
        setFilterData((pre)=>[...posts]);
      }


    }
  };
  console.log(posts,"fffffffffff");

if(posts.length!==0){

  
  return (
    <div>
      <div className={`${styles.FullProductsPage}`}>
        <div className={`${styles.ProductsPageSideBar}`}>
          <Filter className="filters">
            <div >
              <label htmlFor="Price">Sort by Price</label>
              <select id="price" onChange={(e)=>handleSort(e)}>
               


                {/* {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))} */}
           
                <option value="">all</option>
                <option value="asc">Low to high</option>
                <option value="desc">High to low</option>
           
              </select>
            </div>
            <div>
              {/* <label htmlFor="rating">filter byrating</label>
              <select id="rating" onChange={handelRating}>
                <option value="">filter by rating</option>
                {ratingOptions.map((rating) => (
                  <option key={rating} value={rating}>
                    Above {rating}
                  </option>
                ))}
              </select> */}
            </div>
            <div>
              <label htmlFor="sort">Sort by year</label>
              <select id="sort" onChange={(e)=>handleDateSort(e)}>
                <option value="">all</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </Filter>
        </div>
        <Div className={`${styles.ProductsPage}`}>
          <div
            className="search"
            style={{ width: "100%", margin: "auto", paddingTop: "30px" }}
          >
            <input
              type="text"
              className="search"
              placeholder="Search any movie"
              style={{ width: "50%", padding: "10px" }}
              onChange={filteredMovies}
            />
          </div>
          <h1 style={{ color: "white", fontSize: "2rem", margin: "20px" }}>
OEM Specs
          </h1>
          {filterData.length!==0 ? (
            <div className={`${styles.PostsCardContainer}`}>
              <table>
                <thead>
                  <th>Model</th>
                  <th>Year</th>
                  <th>List Price</th>
                  <th>Colors</th>
                  <th>Mileage</th>
                  <th>Power</th>
                  <th>Max Speed</th>
                  {/* <th>OEM DATA</th> */}
                </thead>
                <tbody>
                  {filterData?.map((el) => {
                    return <PostCard key={el._id} {...el} />;
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <CircularProgress isIndeterminate color="green.300" />
          )}
        </Div>
      </div>
    </div>
  );
}else{
  return(
    <div style={{backgroundColor:"white"}}>
      <h1 style={{color:"black",fontWeight:"600",fontSize:"35px"}}> Loading... <CircularProgress isIndeterminate color="green.200" /></h1>
    </div>
  )
}
};

export default Products;
const diV = styled.div`
color: black;
  .search > input {
    width: 100%;
  }
`;
const Filter = styled.div`
  padding-top: 50px;
  display: grid;
  background-color: white;

  padding-left: 10px;
  height: 100%;
  position: sticky;

  padding-right: 10px;
  select {
    width: 100%;
    padding: 5px 20px 5px;
    font-weight: 800;
    margin: auto;
    background-color: #dbefff;
  }
display: flex;
flex-direction: column;
  label {
    font-size: 20px;
    font-weight: 800;
  }
  @media (max-width: 400px) {
    .search {
      width: 80%;
    }
    label {
      display: none;
    }
    select {
      margin-bottom: 10px;
      width: 80%;
    }
    align-items: center;
  }
`;

const Div = styled.div`
  margin: auto;
  /* border: 10px solid red; */
  background-color: #180d2c;
  height: 100vh;
  /* background-color: black; */
  color: white;
  color: #171819;
  table {
  
    width: 95%;
    margin: auto;
    font-size: 20px;
    background-color: white;
    position: sticky;
    height: 500px;
  }
  th{
  padding: 10px;
}
  table{
    font-size: 25px;

    
  }
  thead{
    background-color: #626262;
    color:white;
  }
  tbody{
    background-color:#bad9f3 ;
  }
  
  #ProductpageTitle {
    width: 70%;
    justify-content: center;
    /* border-top: 1px solid #e4c59066; */
    font-family: "Tangerine", cursive;
    font-size: 4rem;
    font-weight: 100;
    padding-top: 50px;
    padding-bottom: 30px;
    margin: auto;
  }
  #ProductpageTitle > h1 {
    margin: auto;
    justify-content: center;
  }
  a {
    color: #e4c590;
    font-size: 30px;
    text-decoration: none;
  }
  #anchor {
    width: 20%;
    justify-content: space-evenly;
    display: flex;
    margin: auto;
    align-items: center;
    padding-bottom: 20px;
  }

  #postButton {
    width: 70%;
    color: #e4c590c2;
    height: 7rem;
    background-color: #e4c59027;
    font-size: 2.5rem;
    font-family: "Tangerine", cursive;
    outline: none;
    border: none;
    border-radius: 5px;
    border: 2px solid #e4c5908f;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #postButton:hover {
    height: 7rem;
    background-color: transparent;
    border: 2px solid #e4c5908f;
  }
  i {
    width: 2rem;
  }

  #PostIcons {
    width: 100%;
    display: flex;
    border-top: 1px solid #e4c590c2;
    padding-top: 10px;
    justify-content: space-around;
  }

  .filters {
    display: grid;
    border: 1px solid red;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1300px) {
    #ProductpageTitle {
      font-size: 4rem;
    }
    #anchor {
      width: 40%;
      justify-content: space-around;
    }
    a {
      color: #e4c590;

      text-decoration: none;
    }
    width: 100%;
  }

  @media (max-width: 400px) {
    #ProductpageTitle {
      font-size: 2.5rem;
    }
    #anchor {
      width: 40%;
      justify-content: space-around;
    }
    a {
      color: #e4c590;
      font-size: 20px;
      text-decoration: none;
    }
  }
`;
