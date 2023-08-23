import Link from "next/link";
import { Form, notification } from "antd";
import { useSignupMutation } from "../../features/auth/authApi";
const FormDetail = () => {
  const [signup, { isLoading, isFetching, data, error, status, isSuccess, isUninitialized }] = useSignupMutation()
  const [form] = Form.useForm()
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
  }

  return (
    <Form form={form} onFinish={handleSignup}>
      <div className="heading text-center">
        <h3>Register to your account</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-thm">
            Login
          </Link>
        </p>
      </div>
      {/* End .heading */}

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
      {/* End .form-group */}

        {/* <div className="form-group form-check custom-checkbox mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            required
            id="terms"
          />
          <label className="form-check-label form-check-label" htmlFor="terms">
            I have read and accept the Terms and Privacy Policy?
          </label>
        </div> */}
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Register
      </button>
      {/* login button */}
      {isLoading ? 'Creating user...' : ''}
                  {isSuccess ? data.status == 400 ? <div>{data.message}</div> : <div>User created successfully!</div>:""}
                  {error && <div>Error creating user!</div>}
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
            className="btn btn-block color-white bgc-gogle mb0 w-100"
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

export default FormDetail;
