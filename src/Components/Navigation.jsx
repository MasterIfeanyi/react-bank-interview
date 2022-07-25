import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { logOut } from '../features/auth/authSlice'
import { useLogoutMutation } from './logoutApiSlice'
import { useDispatch } from 'react-redux'

const Navigation = () => {


    const dispatch = useDispatch();

    const [ signOff ] = useLogoutMutation()

    const navigate = useNavigate();


    const signOut = async () => {

        try {
            console.log("click");
            await signOff().unwrap();
            dispatch(logOut());
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    }




  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="myNavBar">
        <Container>
            <Navbar.Brand href="#home">Welcome</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <NavLink to="/" className="navLink" style={({ isActive }) => {
                        return {
                            color: isActive ? "red" : "white"
                        }
                    }}
                    >Home</NavLink>
                    <NavLink to="/account" className="navLink" style={({ isActive }) => {
                        return {
                            color: isActive ? "red" : "white"
                        }
                    }}
                    >Account</NavLink>
                </Nav>
                <button className="navLink btn btn-primary logOut" onClick={signOut}>Log Out</button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation