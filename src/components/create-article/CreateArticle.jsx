import { useState } from "react";
import { Checkbox, Form, notification } from "antd";
import { useUploadFileMutation } from "../../features/upload/uploadApi";
import Image from "next/image";
import { useEffect } from "react";
import { useCreateArticleMutation, useGetTopicAllQuery } from "../../features/articles/articlesApi";
const CreateArticle = () => {
  const [form] = Form.useForm()
  const [createArticle, { isLoading, isSuccess, data, isError }] = useCreateArticleMutation()
  const { data: topicAll, isFetching: fetchingTopic } = useGetTopicAllQuery()
  const [uploadFile, { isLoading: uploadLoading, isSuccess: isUploadFileSuccess, data: avatarUpload, isError: uploadFileError }] = useUploadFileMutation();
  const [propertySelectedImgs, setPropertySelectedImgs] = useState()


  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Successfully creating!!" })
    }

  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Fail creating!!" })
    }

  }, [isError])

  

  const uploadProfile = async (e) => {
    await uploadFile(e.target.files[0]).then((res) => {
      setPropertySelectedImgs(`${process.env.apiUrl}/FileUpload/files/${res.data.data}`)

    })

  }

  const handleCreateArticle = (e) => {
    const body = {
      title: e.title,
      img: propertySelectedImgs,
      content: e.content,
      topicID: e.topicID

    }
    createArticle(body)
  }

  return (
    <>
      <Form form={form} onFinish={handleCreateArticle}>
        <div className="row">

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
                    backgroundImage: ``
                  }
              }
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>

          <div className="col-lg-12">




            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyTitle">Article Title</label>
              <Form.Item name='title'>
                <input type="text" className="form-control" id="propertyTitle" />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyState">Topic</label>
              <Form.Item name={"topicID"} initialValue={1}>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                >
                  {!fetchingTopic &&
                    topicAll.data.map((e, index) => (
                      <option key={index} value={e.id}>{e.name}</option>
                    ))
                  }
                </select>
              </Form.Item>
            </div>
          </div>
          {/* End .col */}



          <div className="col-lg-12">
            <div className="my_profile_setting_textarea">
              <label htmlFor="propertyDescription">Content</label>
              <Form.Item name='content'>
                <textarea
                  className="form-control"
                  id="propertyDescription"
                  rows="7"
                ></textarea>
              </Form.Item>

            </div>
          </div>
          {/* End .col */}




        </div>




        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn2 float-end">Next</button>
          </div>
        </div>
        {/* End .col */}


      </Form>
    </>
  );
};

export default CreateArticle;
