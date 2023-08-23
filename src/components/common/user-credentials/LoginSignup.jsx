import { Form, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { isIE, isChrome, isAndroid, isChromium, isEdge, isFirefox, isIOS, isIPad13, isOpera, isSafari } from 'react-device-detect';
import { useLoginMutation, useSignupMutation } from "../../../features/auth/authApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const LoginSignup = () => {

  const [login, { isSuccess: loginSuccess }] = useLoginMutation();
  const user = useSelector((state) => state.persistedReducer.user);
  const [dismissModal, setDismissModal] = useState('')
  const [message, setMessage] = useState()

  const [signup, { isLoading, isFetching, data, error, status, isSuccess, isUninitialized }] = useSignupMutation()

  const [form] = Form.useForm()
  const [formSignup] = Form.useForm()
  const router = useRouter()

  const getDeviceInfo = () => {
    if (isChrome) {
      return 'Chrome'

    } else if (isChromium) {
      return 'Chromium'

    } else if (isAndroid) {
      return 'Android'
    } else if (isEdge) {
      return 'Edge'

    } else if (isSafari) {
      return 'Safari'
    } else if (isOpera) {
      return 'Opera'
    } else if (isFirefox) {
      return 'Firefox'
    } else if (isIOS) {
      return "IOS"
    } else if (isIE) {
      return 'IE'
    } else {
      return "Other"
    }
  }
  const handleLogin = (e) => {
    const uniqueId = parseInt(Date.now() * Math.random()).toString();
    const bodyData = {
      username: e.username,
      password: e.password,
      deviceInfo: {
        deviceId: uniqueId,
        deviceType: getDeviceInfo()
      }
    }
    login(bodyData)
  }
  useEffect(() => {
    if (loginSuccess) {
      window.location.reload()
    }

  }, [loginSuccess])
  const handleSignup = (e) => {
    if (e.repassword != e.password) {
      notification.error({ message: "Mật khẩu không khớp với mật khẩu nhập lại!" })
    } else {
      const bodyData = {
        username: e.userName,
        fullName: e.fullName,
        password: e.password,
        roles: ["user"]

      }
      signup(bodyData)
    }

    if (isLoading) {
      setMessage(<p>Loading...</p>)
    } else if (error) {
      setMessage(<p>Fail Register!</p>)
    } else if (data) {
      if (data.status == 400) {
        setMessage(<p>{data.message}</p>)
      }
      else {
        setMessage(<p>Successfully Register!!</p>)

      }
    }


  }
  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          className="btn-close"
        ></button>
      </div>
      {/* End .modal-header */}

      <div className="modal-body container pb20">
        <div className="row">
          <div className="col-lg-12">
            <ul className="sign_up_tab nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Login
                </a>
              </li>
              {/* End login tab */}

              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Register
                </a>
              </li>
              {/* End Register tab */}
            </ul>
            {/* End .sign_up_tab */}
          </div>
        </div>
        {/* End .row */}

        <div className="tab-content container" id="myTabContent">
          <div
            className="row mt25 tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="login_thumb">
                <Image
                  width={357}
                  height={494}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/login.jpg"
                  alt="login.jpg"
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-6 col-xl-6">
              <div className="login_form">
                <Form form={form} onFinish={handleLogin}>
                  <div className="heading">
                    <h4>Login</h4>
                  </div>
                  {/* End heading */}

                  <div className="row mt25">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-fb w-100">
                        <i className="fa fa-facebook float-start mt5"></i> Login
                        with Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-googl w-100">
                        <i className="fa fa-google float-start mt5"></i> Login
                        with Google
                      </button>
                    </div>
                  </div>
                  {/* End .row */}

                  <hr />
                  <Form.Item name={"username"}>
                    <div className="input-group mb-2 mr-sm-2">
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroupUsername2"
                        placeholder="User Name Or Email"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="flaticon-user"></i>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                  {/* End input-group */}
                  <Form.Item name={"password"}>
                    <div className="input-group form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="flaticon-password"></i>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                  {/* End input-group */}
                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="remeberMe"
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="remeberMe"
                    >
                      Remember me
                    </label>

                    <a className="btn-fpswd float-end" href="#">
                      Lost your password?
                    </a>
                  </div>
                  {/* End remember me checkbox */}

                  <Form.Item>
                    <button type="submit"
                      data-bs-dismiss={dismissModal}
                      className="btn btn-log w-100 btn-thm">
                      Log In
                    </button>
                  </Form.Item>



                  {/* End submit button */}

                  <p className="text-center">
                    Dont have an account?{" "}
                    <a className="text-thm" href="#">
                      Register
                    </a>
                  </p>
                </Form>
              </div>
              {/* End .col .login_form */}
            </div>
          </div>
          {/* End .tab-pane */}

          <div
            className="row mt25 tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="regstr_thumb">
                <Image
                  width={357}
                  height={659}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/regstr1.jpg"
                  alt="regstr1.jpg"
                />
              </div>
            </div>
            {/* End . left side image for register */}

            <div className="col-lg-6 col-xl-6">
              <div className="sign_up_form">
                <div className="heading">
                  <h4>Register</h4>
                </div>
                {/* End .heading */}

                <Form form={formSignup} onFinish={handleSignup}>
                  <div className="row ">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-fb w-100">
                        <i className="fa fa-facebook float-start mt5"></i> Login
                        with Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-googl w-100">
                        <i className="fa fa-google float-start mt5"></i> Login
                        with Google
                      </button>
                    </div>
                  </div>
                  {/* End .row */}

                  <hr />
                  <Form.Item name={"userName"}>
                    <div className="form-group input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        placeholder="User Name"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="flaticon-user"></i>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                  {/* End .row */}
                  <Form.Item name={"fullName"}>
                    <div className="form-group input-group  mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail2"
                        placeholder="fullname"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-envelope-o"></i>
                        </div>
                      </div>
                    </div>
                  </Form.Item>

                  {/* End .row */}

                  <Form.Item name={"password"}>
                    <div className="form-group input-group  mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        placeholder="Password"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="flaticon-password"></i>
                        </div>
                      </div>
                    </div>
                  </Form.Item>

                  {/* End .row */}
                  <Form.Item name={"repassword"}>
                    <div className="form-group input-group  mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword3"
                        placeholder="Re-enter password"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="flaticon-password"></i>
                        </div>
                      </div>
                    </div>
                  </Form.Item>


                  {/* End .row */}

                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className="form-select"
                      data-live-search="true"
                      data-width="100%"
                    >
                      <option data-tokens="SelectRole">Single User</option>
                      <option data-tokens="Agent/Agency">Agent</option>
                      <option data-tokens="SingleUser">Multi User</option>
                    </select>
                  </div>
                  {/* End from-group */}

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="terms"
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="terms"
                    >
                      I have accept the Terms and Privacy Policy.
                    </label>
                  </div>
                  {/* End from-group */}

                  <Form.Item>
                    <button type="submit" className="btn btn-log w-100 btn-thm"
                      data-bs-dismiss={dismissModal}
                    >
                      Sign Up
                    </button></Form.Item>
                  {isLoading ? 'Creating user...' : ''}
                  {isSuccess ? data.status == 400 ? <div>{data.message}</div> : <div>User created successfully!</div>:""}
                  {error && <div>Error creating user!</div>}


                  {/* End btn */}

                  <p className="text-center">
                    Already have an account?{" "}
                    <a className="text-thm" href="#">
                      Log In
                    </a>
                  </p>
                </Form>
                {/* End .form */}
              </div>
            </div>
            {/* End register content */}
          </div>
          {/* End .tab-pane */}
        </div>
      </div>
    </div >
  );
};

export default LoginSignup;
