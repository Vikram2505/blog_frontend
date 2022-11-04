import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../component/Spinner';
import { showTourByTag } from '../../redux/features/tourSlice';

const ShowTagTour = () => {
    const { tagName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { tourByTag, loading } = useSelector((state) => ({ ...state.tour }));
    console.log(tourByTag);

    useEffect(() => {
        if (tagName) {
            dispatch(showTourByTag(tagName))
        }
        // eslint-disable-next-line
    }, [tagName])

    if(loading){
        return <Spinner />
    }

    return (
        <div className="homepage__body">
        <h3>Tour by tag: {tagName}</h3>
        <hr />
        {tourByTag && tourByTag?.tourByTag?.map((item) => (
            <MDBCardGroup key={item._id}>
                <MDBCard style={{maxWidth: '600px'}} className="mt-2 m-auto">
                    <MDBRow className='g-0'>
                        <MDBCol md={'4'}>
                            <MDBCardImage className='rounded' src={item.imageFile} title={item.title} fluid style={{maxWidth: '150px', maxHeight: '150px'}}/>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBCardBody>
                                <MDBCardTitle>
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText>
                                    {item.description}
                                </MDBCardText>
                                <div style={{float: 'left', marginTop: '-10px'}}>
                                    <MDBBtn size='sm' rounded color='info' onClick={() => navigate(`/tour/${item._id}`)}>Read more</MDBBtn>
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

export default ShowTagTour