import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBIcon } from "mdb-react-ui-kit"
import { toast } from 'react-toastify';
import { getSingleTour, showRelatedTour } from '../../redux/features/tourSlice';
import "../Home/Home.css";
import moment from "moment"
import Spinner from '../../component/Spinner';
import RelatedTour from '../RelatedTour/RelatedTour';
const SingleTour = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tour, loading, error } = useSelector((state) => ({ ...state.tour.tour }));
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(showRelatedTour(tags));

  }, [tags])

  useEffect(() => {
    if (id) {
      dispatch(getSingleTour(id))
    }

    error && toast.error(error)

    // eslint-disable-next-line
  }, [id, error])
  if (loading) {
    return <Spinner />
  }

  return (
    <MDBContainer style={{ marginTop: '5rem' }}>
      <MDBCard className='mb-3 mt-3'>
        <MDBCardImage position='top' className='w-100' style={{ maxHeight: '600px', objectFit: 'contain' }} src={tour?.imageFile ? tour?.imageFile : "/image/defaultImage.jpg"} alt={tour?.title} />
        <MDBCardBody>
          <h3>{tour?.title}</h3>
          <span><p className='text-start tourName'>Created by: {tour?.name}</p></span>
          <div style={{ float: 'left' }}>
            <span className='text-start'>{tour?.tags.map((item) => `#${item} `)}</span>
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

        {/* Related Tour */}
        <RelatedTour tourId={id} />

      </MDBCard>
    </MDBContainer>
  )
}

export default SingleTour