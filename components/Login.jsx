import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import supabase from "../src/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      });
      if (error) throw error;
      alert("Login Successfull");
      navigate("/");
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
        value={state.email}
        name="email"
        placeholder="Enter Email"
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
      <Button type="submit" variant="contained">
        Log In
      </Button>
    </form>
  );
};

export default Login;
