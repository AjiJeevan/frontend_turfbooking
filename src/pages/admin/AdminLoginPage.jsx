import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../../app/features/user/userSlice';
import toast from "react-hot-toast";

function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role:"",
  });


  const changeHandler = (event) => {
    let temData = { ...loginData };
    temData[event.target.name] = event.target.value;
    setLoginData(temData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginData.role == "admin") {
        const response = await axiosInstance({
          method: "PUT",
          url: "/admin/login",
          data: loginData,
        });
        dispatch(setUser(response?.data?.data));
        // console.log("Admin Details ..... ", response?.data?.data);
        toast.success("Login Successfull")
        navigate("/admin/home");
      } 
      else if (loginData.role == "manager") {
         const response = await axiosInstance({
           method: "PUT",
           url: "/manager/login",
           data: loginData,
         });
        dispatch(setUser(response?.data?.data));
        // console.log("Manager Details ..... ", response?.data?.data);
        toast.success("Login Successfull");
        navigate("/manager/home");
       }
       else {
        toast.error("Please provide valid information ");
        navigate("/admin/login");
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(clearUser());
      navigate("/admin/login");
    }
  };

    return (
      <>
        <Container className="main-section d-flex justify-content-center pt-5 mt-5">
          <Card className="p-3 shadow-lg" style={{ width: "350px" }}>
            <h3 className="text-center mb-3">Login</h3>
            <Form onSubmit={handleSubmit} method="post">
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginData.email}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="roleselection">
                <div className="d-flex gap-3 mb-3">
                  <Form.Check // prettier-ignore
                    type="radio"
                    id="admin"
                    label="Admin"
                    name="role"
                    value="admin"
                    onChange={changeHandler}
                  />

                  <Form.Check
                    type="radio"
                    label="Manager"
                    id="manager"
                    name="role"
                    value="manager"
                    onChange={changeHandler}
                  />
                </div>
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        </Container>
      </>
    );
}

export default AdminLoginPage