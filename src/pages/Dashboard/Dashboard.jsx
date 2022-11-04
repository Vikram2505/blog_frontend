import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteTour, getTourByUser } from '../../redux/features/tourSlice';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBCardText, MDBBtn, MDBIcon, MDBCardGroup } from "mdb-react-ui-kit"
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Spinner from '../../component/Spinner';
import { setLogout } from '../../redux/features/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const _id = useSelector((state) => ({ ...state.auth?.user?.result?._id }));
    const { userTours, error, loading } = useSelector((state) => ({ ...state.tour }));

    const excerpt = (str) => {
        if (str?.length > 200) {
            str = str.substring(0, 40) + " ...";
        }
        return str;
    }

    useEffect(() => {
        if (_id) {
            dispatch(getTourByUser())
        }
        if (error === "token is expired") {
            dispatch(setLogout());
        }
        error && toast.error(error);

    }, [error])

    if (loading) {
        return (
            <h2>
                <Spinner />
            </h2>
        );
    }
    const deleteTourDashboard = (id) => {
        if (window.confirm("Are you sure you want to delete this tour ? ")) {
            dispatch(deleteTour({ id, toast }))
        }
    }
    return (
        <div className='m-auto dashboard__body'>
            <h3>User Tours</h3>
            {userTours.count === 0 &&
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle className='text-center'>No tours created.</MDBCardTitle>
                        <MDBCardText className='text-center mt-4'>
                            <Link to={'/addTour'}>
                                <MDBBtn>Create a tour</MDBBtn>
                            </Link>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            }
            {userTours && userTours?.userTours?.map((item) => (
                <MDBCardGroup className='mb-3' key={item._id}>
                    <MDBCard style={{ maxWidth: '600' }} className='mt-2'>
                        <MDBRow className='g-0'>
                            <MDBCol md={"4"}>
                                <MDBCardImage src={item?.imageFile} alt={item.title} fluid />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>{item?.title}</MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>{excerpt(item.description)}</small>
                                    </MDBCardText>
                                    <div style={{ marginLeft: '5px', float: 'right', marginTop: '-60px' }}>
                                        <MDBBtn onClick={() => deleteTourDashboard(item._id)} className='mt-1' color='none'>
                                            <MDBIcon fas icon='trash' style={{ color: '#dd4b39' }} size='lg' />
                                        </MDBBtn>
                                        <Link to={`/editTour/${item._id}`}>
                                            <MDBIcon fas icon='edit' style={{ color: '#55acee', marginLeft: '10px' }} size='lg' />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}

export default Dashboard