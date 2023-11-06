import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { CircularProgress, useToast } from "@chakra-ui/react";
const SignUp = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [loader,setLoader]=useState(false)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Avatar, setAvatar] = useState(
    "https://www.sarojhospital.com/images/testimonials/dummy-profile.png"
  );
  const logindata = useSelector((store) => store.authReducer);
  console.log(logindata);
  const url = "https://buycar2.onrender.com/api/v1";
  const toast = useToast();

  const dispatch = useDispatch();
  const handelSignin = async () => {
    console.log();
    try {
      setLoader(true)
      let res = await axios.post(`${url}/user/signup`, {
        email: email,
        password: password,
        name: username,
      });
      res = res.data;
      console.log(res,"signup");
      setLoader(false)
      if (res.message == "User created") {
        toast({
          title: "User created",
          description: "Registration succesfull🤩",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });

        navigate("/login");
      } else {
        setLoader(false)
        console.log("coming in error");
        toast({
          title: "Something went wrong 😔",
          description: `${res.message}`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      setLoader(false)
      toast({
        title: "Something went wrong 😔",
        description: `${err.response.data.errors[0].msg} **${err.response.data.errors[0].path}**`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Div>
      <DIV>
        <h1>Sign In</h1>
        <h2>🤩Welcome to Buy Car🚘 🤩</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handelSignin}>Sign up now</button>

        <br />
        <p className="p2">
          Already have an account?{" "}
          <Link className="Link" to={"/login"}>
            Login  {loader? <CircularProgress isIndeterminate color="green.300" />:""}
          </Link>
        </p>
      </DIV>
    </Div>
  );
};

const Div = styled.div`
  height: 100vh;
`;
const DIV = styled.div`
  width: 400px;
  padding: 20px 0px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid gray;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.332) 1.95px 1.95px 2.6px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  height: 60%;
  h1 {
    font-size: 2rem;
    font-weight: 800;
    text-align: left;
  }
  .Link {
    color: #6b21ff;
    font-weight: 800;
    font-size: 1.2rem;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 400;
  }
  input {
    width: 80%;
    height: 30px;
    font-size: larger;
    font-weight: 200;
  }

  button {
    width: 150px;

    background-color: #6b21ff;
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 5px 20px;
    border-radius: 5px;
  }
  button:hover {
    width: 150px;
    color: white;

    background-color: #6b21ffa1;
    font-weight: 800;
    border: 2px solid #6b21ffb7;
    font-size: 1.2rem;
    padding: 5px 20px;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

export default SignUp;
