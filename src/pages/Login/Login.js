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
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../redux/features/authSlice";
// import { GoogleLogin } from "react-google-login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const [a, seta] = useState(1);

  const initialState = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));      
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // const googleSuccess = (resp) => {
  //   const email = resp?.profileObj?.email;
  //   const name = resp?.profileObj?.name;
  //   const token = resp?.tokenId;
  //   const googleId = resp?.googleId;
  //   const result = {email, name, token, googleId}
  //   dispatch(googleSignIn({result, navigate, toast}));
  // }

  // const googleFailure = (error) => {
  //   console.log(error)
  // }

  useEffect(() => {
    error && toast.error(error);

  }, [a,error]);

  return (
    <div className="login__body">
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign in</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem feedback="Please enter email address" invalid>
                <MDBInput
                  label="Email"
                  type={"email"}
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
            <MDBValidationItem feedback="Please enter Password" invalid>
              <MDBInput
                label="Password"
                type={"password"}
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
              </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn className="w-100 mt-2" onClick={(e)=> seta((prev) =>prev+1)}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
            <br />
            {/* <GoogleLogin
              clientId="......"
              render={(renderProps) => (
                <MDBBtn
                  className="w-100"
                  color="danger"
                  onClick={renderProps.disabled}
                  disabled={renderProps.disabled}
                >
                  <MDBIcon className="me-2" fab icon="google" /> Signin with Google
                </MDBBtn>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            /> */}
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to={"/register"}>
            <p>Dont't have an account ? Sign up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
