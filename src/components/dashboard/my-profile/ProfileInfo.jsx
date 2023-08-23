import { useState } from "react";
import { useUploadFileMutation, useUpdateProfileMutation, useGetUserQuery } from "../../../features/upload/uploadApi";
import { Form, notification } from "antd";
import Router from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const ProfileInfo = () => {
    const [form] = Form.useForm()
    const persistedState = useSelector((state) => state.persistedReducer.user);
    const [profile, setProfile] = useState(persistedState.currentUser?.avatar);
    const { data: user, isLoading, error, isSuccess, refetch } = useGetUserQuery();
    const [uploadFile, { isLoading: uploadLoading, isSuccess: isUploadFileSuccess, data: avatarUpload, isError: uploadFileError }] = useUploadFileMutation();
    const [updateProfile, { isLoading: updateProfileLoading, isSuccess: isUpdateProfileSuccess, data: profileUpdate, isError: updateProfileError }] = useUpdateProfileMutation();

    // upload profile
    const uploadProfile = (e) => {
        uploadFile(e.target.files[0])

    }

    useEffect(() => {
        if (isUploadFileSuccess) {
            setProfile(`${process.env.apiUrl}/FileUpload/files/${avatarUpload.data}`)
        }
    }, [isUploadFileSuccess, form])

    useEffect(() => {
        if (isUpdateProfileSuccess) {
            refetch()
            notification.success({ message: "Successfully Updated!" })
        }

    }, [isUpdateProfileSuccess])

    useEffect(()=>{
        if(isSuccess) {
        setProfile(`${process.env.apiUrl}/FileUpload/files/${user.data.avatar}`)

        }

    },[isSuccess])



    const HandleUpdateProfile = (e) => {
        const body = {

            userID: persistedState.currentUser.userID,
            url_avatar: profile,
            email: e.email,
            firstName: e.firstName,
            lastName: e.lastName,
            phone: e.phoneNumber,
            address: e.address,
            desc: e.desc

        }
        updateProfile(body)

    }
    if (updateProfileLoading) {
        return <div>Updating...</div>;

    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        Router.push("/404.js")
    }


    return (
        <div className="row">
            <Form form={form} onFinish={HandleUpdateProfile} initialValues={user.data}>
                <div className="col-lg-12">

                    <div className="wrap-custom-file">
                        <input
                            type="file"
                            id="image1"
                            accept="image/png, image/gif, image/jpeg, image/jpg"
                            onChange={uploadProfile}
                        />
                        <label
                            style={
                                isUploadFileSuccess
                                    ? {
                                        backgroundImage: `url(${process.env.apiUrl}/FileUpload/files/${avatarUpload.data})`,
                                    }
                                    : {
                                        backgroundImage: `url(${user.data.avatar})`
                                    }
                            }
                            htmlFor="image1"
                        >
                            <span>
                                <i className="flaticon-download"></i> Upload Photo{" "}
                            </span>
                        </label>
                    </div>
                    <p>*minimum 260px x 260px</p>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleEmail">Email</label>
                        <Form.Item name="email">
                            <input
                                type="email"
                                className="form-control"
                                id="formGroupExampleEmail"
                                placeholder="creativelayers@gmail.com"
                            />
                        </Form.Item>
                    </div>
                </div>
                {/* End .col */}



                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleInput3">First Name</label>
                        <Form.Item name="firstName">
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput3"
                            />
                        </Form.Item>
                    </div>
                </div>
                {/* End .col */}



                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleInput4">Last Name</label>
                        <Form.Item name="lastName">
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput4"
                            />
                        </Form.Item>
                    </div>
                </div>
                {/* End .col */}




                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleInput8">Phone</label>
                        <Form.Item name="phoneNumber">
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput8"
                            />
                        </Form.Item>
                    </div>
                </div>
                {/* End .col */}



                <div className="col-xl-12">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleInput13">Address</label>
                        <Form.Item name="address">
                            <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput13"
                            />
                        </Form.Item>

                    </div>
                </div>
                {/* End .col */}



                <div className="col-xl-12">
                    <div className="my_profile_setting_textarea">
                        <label htmlFor="exampleFormControlTextarea1">
                            About me
                        </label>
                        <Form.Item name="desc">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="7"
                            ></textarea>
                        </Form.Item>

                    </div>
                </div>
                {/* End .col */}

                <div className="col-xl-12 text-right">
                    <div className="my_profile_setting_input">
                            <button type="submit" className="btn btn2">Update Profile</button>
                    </div>
                </div>
                {/* End .col */}
            </Form>

        </div >
    );
};

export default ProfileInfo;
