import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar, Form, Button, Nav, Offcanvas } from "react-bootstrap";
import { Search, Bell, List } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { IoGameControllerOutline, IoHome, IoHomeOutline } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { RiUserStarFill } from "react-icons/ri";
import { RiUserReceived2Fill } from "react-icons/ri";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { ClerkContext } from "../contexts/ClarkContext";
import { toast } from "react-toastify";

function ResponsiveNavbar() {

    const { openSignIn } = useClerk()
    const { user } = useUser()
    const { authToken } = useContext(ClerkContext)
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            // setSearchQuery('');
        }
    };

    const HandelLibrary = () => {
        if (authToken) {
            navigate('/library')
        }
        else {
            openSignIn()
            // toast.error('Please Sign Up')
        }
    }

    // const handleSearch = () => {

    // }
    // useEffect(() => {
    //     handleSearch();
    // }, [showSearch])
    return (
        <>
            <Navbar expand="lg" className="bg-dark py-2 position-sticky top-0 z-3" variant="dark">
                <Container fluid className="d-flex align-items-center flex-nowrap">
                    {/* this is the logo of the navbar */}
                    <Navbar.Brand  >
                        <Link to={'/home'} style={{
                            cursor: "pointer",
                            textDecoration: "none"
                        }}>
                            <img
                                src={logo}
                                width={'30'}
                                alt=""
                            />
                            <span className="text-white fw-bold d-none d-md-inline"> RAWG</span>
                        </Link>
                    </Navbar.Brand>

                    {/*Here i implement the Search Bar */}
                    <Form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearchSubmit}>
                        <Link to={`/search`} className="input-group ">
                            <span className="input-group-text bg-secondary border-0">
                                <Search className="text-white" />
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control bg-secondary border-0 text-white "
                                style={{
                                    outline: "none",
                                    boxShadow: "none",
                                    borderBottom: "1px solid transparent",
                                    textDecoration: "none",
                                }}
                                placeholder="Search games"
                            />
                        </Link>
                    </Form>

                    {/* my library and sign up button */}
                    <Nav className="d-flex align-items-center gap-4">
                        <div onClick={HandelLibrary} className="text-white d-none d-lg-block"
                            style={{ textDecoration: "none" }}
                        >
                            <span className="text-white fw-bold fs-6 btn btn-primary"> <IoGameControllerOutline /></span>
                        </div>
                        
                        {user ? <UserButton /> :
                            <button
                                onClick={() => openSignIn()}
                                className="mx-2 d-none d-lg-block btn btn-primary fs-6 px-2 text-white shadow-sm"
                            >
                                Sign Up / Sign In
                            </button>
                        }

                        {/* Hamburger Menu on the Right side*/}
                        <Button
                            variant="link"
                            className="d-lg-none text-white ms-2"
                            onClick={() => setShowMenu(true)}
                        >
                            <List size={27} />
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* use Offcanvas Sidebar for Mobile & Tablets */}
            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end" className="bg-dark text-white">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <NavLink to="/" className="text-white mobile-nav">
                            <span><IoHome /></span>
                            <span>Home</span>
                        </NavLink>
                        <div onClick={HandelLibrary} className="text-white mobile-nav">
                            <span><IoGameController /></span>
                            <span>My Library</span>
                        </div>
                        {user ? <UserButton /> :
                            <div className="text-white mobile-nav">
                                <span><RiUserStarFill /></span>
                                <span
                                    onClick={() => openSignIn()}

                                >
                                    Sign Up
                                </span>
                            </div>
                        }
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default ResponsiveNavbar