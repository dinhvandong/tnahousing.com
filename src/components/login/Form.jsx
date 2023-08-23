import { Form } from "antd";
import Link from "next/link";
import { useLoginMutation } from "../../features/auth/authApi.js";
import { isIE, isChrome, isAndroid, isChromium, isEdge, isFirefox, isIOS, isIPad13, isOpera, isSafari } from 'react-device-detect';

const FormLogin = () => {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const [form] = Form.useForm()

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

  return (
    <Form form={form} onFinish={handleLogin}>
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
        </p>
      </div>
      {/* End .heading */}

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
      {/* End .input-group */}

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
          Forgot password?
        </a>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Log In
      </button>
      {/* login button */}
      {isLoading ? 'Log in...' : ''}
      {isSuccess && <div>User Log in successfully!</div>}
      {error && <div>Error Log in user!</div>}

      <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div>
      {/* devider */}

      <div className="row mt25">
        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn-block color-white bgc-fb mb0 w-100"
          >
            <i className="fa fa-facebook float-start mt5"></i> Facebook
          </button>
        </div>
        {/* End .col */}

        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button>
        </div>
        {/* End .col */}
      </div>
      {/* more signin options */}
    </Form>
  );
};

export default FormLogin;
