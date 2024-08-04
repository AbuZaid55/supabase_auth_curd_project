import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import supabase from "../src/supabase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    address: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
        options: {
          data: {
            name: state.name,
            phoneNo: state.phoneNo,
            address: state.address,
          },
        },
      });
      if (error) throw error;
      if (data?.user?.id) {
        alert("Check your email for verification link");
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="form"
    >
      <TextField
        value={state.name}
        name="name"
        placeholder="Enter Name"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        value={state.email}
        name="email"
        placeholder="Enter Email"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        value={state.phoneNo}
        name="phoneNo"
        placeholder="Enter PhoneNo"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        value={state.password}
        name="password"
        placeholder="Enter Password"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        value={state.address}
        name="address"
        placeholder="Enter Address"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
