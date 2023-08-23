import { Form, notification } from "antd";
import { useSelector } from "react-redux";
import { useChangePasswordMutation, useGetUserQuery } from "../../../features/upload/uploadApi";
import { useEffect } from "react";
import { Router } from "next/router";

const ChangePassword = () => {

  const [form] = Form.useForm()
  const persistedState = useSelector((state) => state.persistedReducer.user);
  const { data: user, isLoading: loadData, isError: errorLoad, refetch } = useGetUserQuery();
  const [changePassword, { isLoading, isSuccess, data, isError }] = useChangePasswordMutation();

  // upload profile
  const HandleChangePassword = (e) => {

    if(e.newPassword != e.confirm) {
      notification.error({message:"New password and confirm password are not same!"})
    }else{
      const body = {
        oldPassword:e.oldPassword,
        newPassword: e.newPassword
      }
      changePassword(body)
    }

  }
  useEffect(() => {
    if (isSuccess) {
      if(data.status == 200){
        refetch()
        notification.success({ message: "Successfully Updated!" })
      }else {
        notification.error({ message: "Fail Updated!" })

      }
     
    }
  }, [isSuccess])
  if (loadData) {
    return <div>Loading...</div>;
  }

  if (errorLoad) {
    Router.push("/404.js")
  }


  return (

    <>
      <Form form={form} onFinish={HandleChangePassword}>
        <div className="row">
          <div className="col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleOldPass">Old Password</label>
              <Form.Item name='oldPassword'>
              <input
                type="password"
                className="form-control"
                id="formGroupExampleOldPass"
              />
              </Form.Item>
             
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="row">
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleNewPass">New Password</label>
              <Form.Item name='newPassword'>
                <input
                  type="password"
                  className="form-control"
                  id="formGroupExampleNewPass"
                />
              </Form.Item>

            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleConfPass">
                Confirm New Password
              </label>
              <Form.Item name='confirm'>
              <input
                type="password"
                className="form-control"
                id="formGroupExampleConfPass"
              />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-xl-12">
            <div className="my_profile_setting_input float-start fn-520">
              <button className="btn btn3 btn-dark">Update Profile</button>
            </div>
            <div className="my_profile_setting_input float-end fn-520">
              <button className="btn btn2">Update Profile</button>
            </div>
          </div>
          {/* End .col */}
        </div>
      </Form>

    </>
  );
};

export default ChangePassword;
