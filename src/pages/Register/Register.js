import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBIcon,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signUp } from "../../redux/features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.warning("Password not match.");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(signUp({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="login__body">
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign in</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem
              className="col-md-6"
              feedback="*Please provide first name."
              invalid
            >
              <MDBInput
                label="First Name"
                type={"text"}
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-6"
              feedback="*Please provide last name."
            >
              <MDBInput
                label="Last Name"
                type={"text"}
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                validation="Please enter email address"
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="*Please provide email name."
            >
              <MDBInput
                label="Email"
                type={"email"}
                value={email}
                name="email"
                onChange={onInputChange}
                required
                validation="Please enter email address"
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="*Please provide password here."
              invalid
            >
              <MDBInput
                label="Password"
                type={"password"}
                value={password}
                name="password"
                onChange={onInputChange}
                required
                validation="Please enter Password"
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="*Please provide confirm password."
              invalid
            >
              <MDBInput
                label="Confirm Password"
                type={"password"}
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                validation="Please fill Confirm Password"
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn className="w-100 mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to={"/login"}>
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
