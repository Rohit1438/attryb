import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Css/SingleProducts.module.css";
import StarRating from "../Components/Stars";
import axios from "axios";
import { styled } from "styled-components";
import Comment from "../Components/Comment";
import line1 from "../Images/Home/line1.png";
import { getOEMProducts, postComment } from "../Redux/products/action";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@chakra-ui/react";
// import { COMMENT_ADD } from "../Redux/products/actionTypes";
import { color, colorScheme, useToast } from "@chakra-ui/react";

const SingleProductsPage = () => {
  const [loading, setLoading] = useState(true);

  const [change, setChange] = useState(false);
  const Url = "https://spicy-hall.onrender.com/recipes";
  const storedData = localStorage.getItem("spicy_hall");
  let existingData = storedData ? JSON.parse(storedData) : [];
  const data = useSelector((store) => store.productReducer.singlePageData);
  console.log(data ? data : "", "dataaaaaa");

  const { id } = useParams();
  const toast = useToast();

  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const check = (id) => {
    existingData.forEach((el) => {
      if (el._id === id) {
        setSaved(true);
      }
    });
  };

  // useEffect(() => {
  //   check(id);
  //   console.log("useEffect")
  //   dispatch(getSingleProducts(id))

  // }, [change]);

  // const fetchedComments = () => {
  //   axios
  //     .get(`${Url}/comment/${id}`)
  //     .then((response) => {
  //       SetAllComments(response.data.comment.reverse());
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    check(id);
    console.log("useEffect");
    dispatch(getOEMProducts(id));
    // fetchedComments();

    setLoading(false);
  }, [id, change]);

  const handelSave = async () => {
    console.log("calling save");
    const isProductDuplicate = existingData.some(
      (product) => product._id === data._id
    );

    // console.log(product._id,data.id)
    if (!isProductDuplicate) {
      existingData.push(data);
      localStorage.setItem("Movies", JSON.stringify(existingData));

      setSaved(true);
      toast({
        title: "Saved",
        description: "Movie has been added form saved.",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    } else {
      existingData = existingData.filter((product) => product.id !== data.id);
      localStorage.setItem("Movies", JSON.stringify(existingData));
      setSaved(false);
      toast({
        title: "Removed",
        description: "Movies has been removed form saved.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <DIV className={styles.SingleProductPage}>
        {data ? (
          <>
            <div className={styles.SingleProductContainer}>
              <div className={styles.SingleProduct}>
                <div className={styles.SingleImageConatiner}>
                  <img src={data ? data.images : ""} alt="" />
                </div>
                <div className={styles.SingleDescriptionConatiner}>
                  <h1>{data.name}</h1>
                  <div id="stars">
                    {" "}
                    <StarRating rating={data.rating} />
                  </div>

                  {/* </p> */}

                  <div></div>
                  <div>
                    <h3>{data.category}</h3>
                    <br />
                    <p style={{ textAlign: "left" }}>{data.description}</p>
                  </div>
                  <br />
                  <div className="savebtn">
                    <button onClick={handelSave} id={saved ? "remove" : "save"}>
                      {saved ? "Saved" : "Save"}{" "}
                      <i className="fa-regular fa-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {}
          </>
        ) : (
          <div>
            <CircularProgress isIndeterminate color="green.300" />
          </div>
        )}
      </DIV>
    );
  }
};

export default SingleProductsPage;
const DIV = styled.div`
  color: #ffffff;
  background-color: #a97dff;
  font-size: 18px;

  #stars {
    font-size: 1.5rem;
  }

  .SingleDescriptionConatiner > h1 {
    font-size: 3rem;
  }

  .SingleDescriptionConatiner {
    border: 1px solid red;
    justify-content: center;
    align-items: center;
  }
  img {
    border-radius: 15px;
    width: 100%;
  }
  .detailsofrecipe {
    margin: 20px;
    /* background-color: #e4c590;
  color: black;
  border: 1px solid #e4c590; */
    display: flex;
    flex-direction: row;
    font-weight: 600;
    justify-content: space-evenly;
  }

  #category {
    height: 35px;
  }
  #category > img {
    height: 100%;
    border-radius: 50px;
  }
  h3 {
    font-size: 1.5rem;
  }
  .commentAdd > form {
    display: grid;
    grid-template-columns: 80% 20%;
    justify-content: space-between;
    padding: 15px;
    position: sticky;
    /* Enable scrolling for comments container */
    overflow-y: auto;
    height: 10vh; /* Adjust the height as needed */
    top: 0;
    bottom: 10;
  }
  .commentAdd > form > input {
    width: 100%;
    padding: 10px;
    color: black;
    font-weight: 800;
  }
  #add {
    background-color: #171819;
    padding: 5px 10px 5px;
    color: #e4c590;
  }

  #abouttitle {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #abouttitle > h1 {
    font-size: 2rem;
  }
  #abouttitle > img {
    width: 20%;
    margin: auto;
  }
  .aboutsection {
    width: 90%;
    margin: auto;
    color: #cbcbcb;
  }
  #recipe {
    margin-top: 10px;
    border: 1px solid #f5b55668;
    padding: 20px 50px 0;
    border-radius: 20px;
    text-align: justify;
  }
  #ingredients {
    display: grid;
    text-align: justify;
    margin: 20px;
  }

  #ingredients > h3 {
    color: #e4c590;
  }
  #ingredients > p {
    color: #b7b7b7;
  }
  .savebtn > button {
    width: 200px;
    background-color: #ffffff;
    height: 50px;
    font-weight: 800;
    color: #180342;
  }
  .savebtn > button:hover {
    width: 202px;
    background-color: #d9d1eaa6;
    color: #ffffff;
    border: 2px solid #ffffff;
  }
  #remove {
    background-color: #6b21ff;

    color: #ffffff;
  }

  @media (max-width: 1100px) {
    #ingredients > h3 {
      text-align: center;
      margin: 20px;
    }
    p {
      font-size: 18px;
      text-align: justify;
    }
    .aboutsection > p {
      font-size: 18px;
    }
    #commentheading {
      font-size: 30px;
      font-weight: 800;
    }
    .SingleDescriptionConatiner > h1 {
      font-size: 15px;
    }
    .detailsofrecipe {
      font-size: 5px;
      margin-top: 10px;
      justify-content: center;
    }
  }
`;
