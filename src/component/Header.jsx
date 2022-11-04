import React from 'react';
import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse, MDBNavbarBrand } from "mdb-react-ui-kit"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getTours, searchTours } from '../redux/features/tourSlice';

const Header = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    }
const handleSubmit = (e) => {
    e.preventDefault();
    if(search){
        dispatch(searchTours(search));
        navigate(`/tours/search?searchQuery=${search}`);
        setSearch("");
    }else{
        navigate("/");
        dispatch(getTours());
    }
}
    const { _id, name } = useSelector((state) => ({ ...state?.auth?.user?.result }))
    return (
        <MDBNavbar fixed='top' expand="lg" style={{ backgroundColor: '#f0e6ea' }}>
            <MDBContainer>
                <MDBNavbarBrand href='/' className='logo__header'>
                    Touropedia
                </MDBNavbarBrand>
                <MDBNavbarToggler type='button' aria-expanded="false" area-label='Toggle navigation' onClick={() => setShow(!show)}>
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {_id &&
                            <MDBNavbarItem>
                                <MDBNavbarLink>
                                    <p className='headerText'>Logged in as: {name}</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        }
                        <MDBNavbarItem>
                            <Link to='/' className='nav-link'>
                                <p className='headerText'>Home</p>
                            </Link>
                        </MDBNavbarItem>
                        {_id ?
                            <>
                                <MDBNavbarItem>
                                    <Link to='/addTour' className='nav-link'>
                                        <p className='headerText'>Add Tour</p>
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <Link to='/dashboard' className='nav-link'>
                                        <p className='headerText'>Dashboard</p>
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/login'>
                                        <p className='headerText' onClick={handleLogout}>Logout</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </> :
                            <MDBNavbarItem>
                                <Link to='/login' className='nav-link'>
                                    <p className='headerText'>Login</p>
                                </Link>
                            </MDBNavbarItem>
                        }

                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                        <input type={"text"} className="form-control" placeholder='Search Tour' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div style={{ marginTop: '5px', marginLeft: '5px' }}><MDBIcon fas icon='search' /></div>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header