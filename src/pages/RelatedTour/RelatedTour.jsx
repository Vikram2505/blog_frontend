import React from 'react'
import { useSelector } from 'react-redux'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBIcon, MDBRow, MDBCol } from "mdb-react-ui-kit"
import moment from 'moment';
import { Link } from 'react-router-dom';

const RelatedTour = ({ tourId }) => {
    const { relatedTour } = useSelector((state) => ({ ...state.tour }));
    return (
        <>
            {relatedTour && relatedTour?.relatedTour?.length > 0 && (
                <>
                    <MDBContainer style={{ marginTop: '5rem' }}>
                        <h4>Related Tours</h4>
                        <MDBRow>
                            {relatedTour.relatedTour.filter((item) => item._id !== tourId).map((tour, index) =>
                                <MDBCol md="4" key={index}>
                                    <MDBCard className='mb-3 mt-3'>
                                        <MDBCardImage position='top' className='w-100' style={{ maxHeight: '250px', objectFit: 'contain' }} src={tour?.imageFile ? tour?.imageFile : "/image/defaultImage.jpg"} alt={tour?.title} />
                                        <MDBCardBody>
                                            <h3>{tour?.title}</h3>
                                            <span><p className='text-start tourName'>Created by: {tour?.name}</p></span>
                                            <div style={{ float: 'left' }}>
                                                <span className='text-start'>{tour?.tags.map((tag) => (
                                                    <Link to={`/tours/tourByTag/${tag}`}>
                                                        #{tag} 
                                                    </Link>
                                                ))}</span>
                                            </div>
                                            <br />
                                            <MDBCardText className='text-start mt-2'>
                                                <MDBIcon style={{ float: 'left', margin: '5px' }} far icon="calendar-alt" size='lg' />
                                                <small className='text-muted'>{moment(tour?.createdAt).fromNow()}</small>
                                            </MDBCardText>
                                            <MDBCardText className='lead mv-0 text-start'>
                                                {tour?.description}
                                            </MDBCardText>
                                        </MDBCardBody>

                                    </MDBCard>
                                </MDBCol>
                            )}
                        </MDBRow>
                    </MDBContainer>
                </>
            )}

        </>
    )
}

export default RelatedTour