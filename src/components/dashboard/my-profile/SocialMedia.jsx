import { Form, notification } from "antd";
import { useSelector } from "react-redux";
import { useUpdateSocialMutation, useGetUserQuery } from "../../../features/upload/uploadApi";
import { useEffect } from "react";

const SocialMedia = () => {
  const [formSocial] = Form.useForm()
  const persistedState = useSelector((state) => state.persistedReducer.user);
  const { data: user, isLoading: loadData, isError: errorLoad, refetch } = useGetUserQuery();
  const [updateSocial, { isLoading, isSuccess, data, isError }] = useUpdateSocialMutation();

  // upload profile
  const HandleUpdateSocial = (e) => {
    const body = {

      userID: persistedState.currentUser.userID,
      skype: e.skype,
      facebook: e.facebook,
      website: e.website,
      twitter: e.twitter,
      instagram: e.instagram,
      youtube: e.youtube,


    }
    updateSocial(body)

  }
  useEffect(() => {
    if (isSuccess) {
      refetch()
      notification.success({ message: "Successfully Updated!" })
    }
  }, [isSuccess])
  if (loadData) {
    return <div>Loading...</div>;
  }

  if (errorLoad) {
    Router.push("/404.js")
  }


  return (


    <div className="row">

      <Form form={formSocial} onFinish={HandleUpdateSocial} initialValues={user.data}>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleSkype">Skype</label>
            <Form.Item name="skype">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleSkype"
              />
            </Form.Item>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleWebsite">Website</label>
            <Form.Item name="website">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleWebsite"
              />
            </Form.Item>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleFaceBook">Facebook</label>
            <Form.Item name="facebook">

              <input
                type="text"
                className="form-control"
                id="formGroupExampleFaceBook"
              />
            </Form.Item>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleTwitter">Twitter</label>
            <Form.Item name="twitter">

              <input
                type="text"
                className="form-control"
                id="formGroupExampleTwitter"
              />
            </Form.Item >

          </div>
        </div>

        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInstagram">Instagram</label>
            <Form.Item name="instagram">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInstagram"
              />
            </Form.Item>

          </div>
        </div>
        {/* End .col */}



        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleYoutube">Youtube</label>
            <Form.Item name="youtube">

              <input
                type="text"
                className="form-control"
                id="formGroupExampleYoutube"
              />
            </Form.Item>
          </div>
        </div>


        {/* End .col */}

        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            <Form.Item>
              <button type="submit" className="btn btn2">Update Profile</button>
            </Form.Item>
          </div>
        </div>
        {/* End .col */}
      </Form>
    </div>
  );
};

export default SocialMedia;
