import React, { useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBCol, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { likeTour } from '../redux/features/tourSlice';
import { toast } from 'react-toastify';


const CardTour = ({ imageFile, description, title, tags, _id, name, like}) => {
    const { error } = useSelector((state) => ({ ...state.tour }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id;

    console.log(userId);
    const dispatch = useDispatch();

    const excerpt = (str) => {
        if (str?.length > 45) {
            str = str.substring(0, 50) + "...";
        }
        return str;
    }

    const Likes = () => {
        return (
        <> {like}
            <MDBIcon far icon='thumbs-up' /> Like 
            <MDBIcon fas icon='thumbs-up' /> Like 
        </>
        
        );
    }

    const handleLike = () => {
        if (error) {
            toast.error(error);
        } else {
            dispatch(likeTour({ _id }));
        }
    }


    return (
        <MDBCol className='col-lg-3 col-md-6 pe-3'>
            <MDBCardGroup>
                <MDBCard className='h-100 mt-2 d-sm-flex '>
                    <MDBCardImage src={imageFile ? imageFile : "/image/defaultImage.jpg"} alt={title} className="img-fluid" style={{ width: '100%', height: '300px', objectFit: 'cover' }} position='top' />
                    <div className='top-left'>{name}</div>
                    <span>{tags.map((item, index) => (
                        <Link to={`/tours/tourByTag/${item}`} key={index}> #{item}</Link>)
                    )}
                        <MDBBtn style={{ float: 'right' }} onClick={() => handleLike()} tag="a" color='none'>
                            <Likes />
                        </MDBBtn>
                    </span>
                    <MDBCardBody>
                        <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                        <MDBCardText className='text-start'>{excerpt(description)}
                            <Link to={`/tour/${_id}`}>
                                Read more
                            </Link>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCardGroup>
        </MDBCol>
    )
}

export default CardTour