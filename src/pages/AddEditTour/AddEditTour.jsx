import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBInput, MDBValidationItem, MDBTextArea } from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import './AddEditTour.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateSingleTour, createTour, getTourByUser } from '../../redux/features/tourSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../component/Spinner';

const AddEditTour = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();    
    const initialState = {
        title: "",
        description: "",
        tags: [],
    }

    const [tourData, setTourData] = useState(initialState);
    const { title, description, tags } = tourData;
    const { error, loading, userTours } = useSelector((state) => ({ ...state.tour }));
    const { user } = useSelector((state) => ({ ...state.auth }));

    useEffect(() => {
        if (id) {
            dispatch(getTourByUser())
        }
        if (id) {
            const singleTour = userTours?.userTours?.find((item) => item?._id === id);
            setTourData({ ...singleTour })
        }
        if (userTours.length === 0 && id) {
            navigate("/dashboard");
        }
        error && toast.error(error);


    }, [error, id])

    if (loading) {
        return (
            <h2>
                <Spinner />
            </h2>
        );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description && tags) {
            const updatedTourData = { ...tourData, name: user?.result?.name };
            if (id) {
                dispatch(updateSingleTour({ id, updatedTourData, toast, navigate }));
            } else {
                dispatch(createTour({ updatedTourData, toast, navigate }));
            }
            setTimeout(() => {
                handleClear();
            }, 1000);
        }
    }
    const onInputChange = (e) => {
        let { name, value } = e.target
        setTourData({ ...tourData, [name]: value })
    }
    const handleAddTag = (tags) => {
        setTourData({ ...tourData, tags: [...tourData.tags, tags] })
    }
    const handleDeleteTag = (deleteTag) => {
        setTourData({
            ...tourData,
            tags: tourData.tags.filter((tags) => tags !== deleteTag)
        })
    }
    const handleClear = () => {
        setTourData({ title: "", description: "", tags: [] })
    }

    return (
        <div className='addEditTour__body '>
            <MDBCard alignment='center'>
                <h5>{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <div className="col-md-12">
                            <MDBValidationItem feedback="Please provide title" invalid>
                                <MDBInput
                                    label="Title"
                                    type={"text"}
                                    value={title}
                                    name="title"
                                    className='form-control'
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className="col-md-12">
                            <MDBValidationItem feedback="Please provide description" invalid>
                                <MDBTextArea
                                    label="Description"
                                    type={"text"}
                                    style={{ height: '100px' }}
                                    defaultValue={description}
                                    name="description"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className="col-md-12">
                            <ChipInput name="tags" varient="outlined" placeholder="Enter Tag" fullWidth value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setTourData({ ...tourData, imageFile: base64 })} />
                        </div>
                        <div className="col-12">
                            <MDBBtn className='w-100' >{id ? "Update" : "Submit"}</MDBBtn>
                            <MDBBtn className='w-100 mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEditTour