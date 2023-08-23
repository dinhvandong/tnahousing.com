import { useState } from "react";
import { Checkbox, Form, notification } from "antd";
import { useUploadFileMutation } from "../../../features/upload/uploadApi";
import { useUpdatePropertyMutation, useGetPropertyTypesQuery, useGetStateQuery, useFindByIdPropertyQuery } from "../../../features/properties/propertiesApi";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
const UpdateProperty = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const id = router.query.id;

  // const persistedProperties = useSelector((state) => state.persistedReducer.properties.selectedProperty);

  const { data: propertyTypes, isFetching } = useGetPropertyTypesQuery()
  const { data: persistedProperties,refetch, isSuccess: successProp, isFetching: fetchingProp, isLoading: loadingProp, isError: errorProp } = useFindByIdPropertyQuery({ id })

  const { data: stateAll, isFetching: fetchingState } = useGetStateQuery()
  const [updateProperty, { isLoading, isSuccess, data, isError }] = useUpdatePropertyMutation()
  const [uploadFile] = useUploadFileMutation();

  const [propertySelectedImgs, setPropertySelectedImgs] = useState([])

  // multiple image select
  const multipleImage = async (e) => {
    await uploadFile(e.target.files[0]).then((res) => {
      if (res.data.status == 200)
        setPropertySelectedImgs(propertySelectedImgs.concat(`${process.env.apiUrl}/FileUpload/files/${res.data.data}`))
    }, [])
  }

  // delete image
  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((file) => file !== name);
    setPropertySelectedImgs(deleted);
  }
  useEffect(() => {
    if (successProp)
      setPropertySelectedImgs(persistedProperties?.data?.listImages)

  }, [successProp])

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Successfully updating!!" })
      refetch()
    }

  }, [isSuccess, data])

  if (isError) {
    notification.error({ message: "Fail creating!!" })

  }

  const handleCreateListing = (e) => {
    const body = {
      id: persistedProperties.data.id,
      propertyTitle: e.propertyTitle,
      propertyTypeID: e.propertyTypeID,
      description: e.description,
      listImages: propertySelectedImgs,
      type: e.type,
      price: e.price,
      area: e.area,
      rooms: e.rooms,
      address: e.address,
      state: e.state,
      city: e.city,
      neighborhood: e.neighborhood,
      zip: e.zip,
      country: "US",
      status: 0,
      detailProperty: {
        propertyID: 1,
        areaSize: e.areaSize,
        prefixSize: e.prefixSize,
        landArea: e.landArea,
        landAreaPostfixSize: e.landAreaPostfixSize,
        bedRooms: e.bedRooms,
        bathrooms: e.bathrooms,
        garages: e.garages,
        garagesSize: e.garagesSize,
        isAirConditioning: e.isAirConditioning,
        isLawn: e.isLawn,
        isSwimmingPool: e.isSwimmingPool,
        isBarbeque: e.isBarbeque,
        isMicrowave: e.isMicrowave,
        isDryer: e.isDryer,
        isGym: e.isGym,
        isLaundry: e.isLaundry,
        isTvCable: e.isTvCables,
        isOutdoorShower: e.isOutdoorShower,
        isWasher: e.isWasher,
        isRefrigerator: e.isRefrigerator,
        isWifi: e.isWifi,
        isSauna: e.isSauna,
        isWindowCoverings: e.isWindowCoverings
      }

    }
    // console.log(body)
    updateProperty(body)
  }
  if (loadingProp) {
    return <div>Loading...</div>;
  }

  if (errorProp) {
    router.push("/404.js")
  }

  return (
    <>
      <Form form={form} onFinish={handleCreateListing}>
        <div className="row">
          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyTitle">Property Title</label>
              <Form.Item name='propertyTitle' initialValue={persistedProperties.data.propertyTitle}>
                <input type="text" className="form-control" id="propertyTitle" />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-12">
            <div className="my_profile_setting_textarea">
              <label htmlFor="propertyDescription">Description</label>
              <Form.Item name='description' initialValue={persistedProperties.data.description}>
                <textarea
                  className="form-control"
                  id="propertyDescription"
                  rows="7"
                ></textarea>
              </Form.Item>

            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Type</label>
              <Form.Item name='type' initialValue={1}>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                >
                  <option data-tokens="1">For Rent</option>
                </select>
              </Form.Item>

            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Property Type</label>
              <Form.Item name='propertyTypeID' initialValue={persistedProperties.data.propertyTypeID}>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                >
                  {!isFetching &&
                    propertyTypes.data.map((e, index) => (
                      <option key={index} value={e.id}>{e.name}</option>
                    ))
                  }


                </select>
              </Form.Item>

            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Status</label>

              <Form.Item name='status'>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                >
                  <option data-tokens={0}>Status1</option>
                  <option data-tokens={1}>Status2</option>
          
                </select>
              </Form.Item>
            </div>
          </div> */}
          {/* End .col */}

          <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExamplePrice">Price</label>
              <Form.Item name='price' initialValue={persistedProperties.data.price}>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExamplePrice"
                />
              </Form.Item>

            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleArea">Area</label>
              <Form.Item name='area' initialValue={persistedProperties.data.area}>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleArea"
                />
              </Form.Item>

            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Rooms</label>
              <Form.Item name='rooms' initialValue={persistedProperties.data.rooms}>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExamplePrice"
                />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}
        </div>

        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb30">Location</h3>
          </div>

          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyAddress">Address</label>
              <Form.Item name="address" initialValue={persistedProperties.data.address}>
                <input type="text" className="form-control" id="propertyAddress" />

              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyState">County / State</label>
              <Form.Item name={"state"} initialValue={persistedProperties.data.state}>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                >
                  {!fetchingState &&
                    stateAll.data.map((e, index) => (
                      <option key={index} data-tokens={e.name}>{e.name}</option>
                    ))
                  }
                </select>
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyCity">City</label>
              <Form.Item name='city' initialValue={persistedProperties.data.city}>

                <input type="text" className="form-control" id="propertyCity" />
              </Form.Item>

            </div>
          </div>


          {/* End .col */}

          <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="neighborHood">Neighborhood</label>
              <Form.Item name={"neighborhood"} initialValue={persistedProperties.data.neighborhood}>
                <input type="text" className="form-control" id="neighborHood" />

              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="zipCode">Zip</label>
              <Form.Item name="zip" initialValue={persistedProperties.data.zip}>
                <input type="text" className="form-control" id="zipCode" />

              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Country</label>
              <Form.Item name={"country"}>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
              >
                <option data-tokens="USA">USA</option>
                <option data-tokens="France">France</option>
                <option data-tokens="Germany">Germany</option>
                <option data-tokens="Spain">Spain</option>
                <option data-tokens="Mexico">Mexico</option>
                <option data-tokens="Canada">Canada</option>
                <option data-tokens="United Kingdom">United Kingdom</option>

              </select>
              </Form.Item>
              
            </div>
          </div> */}
          {/* End .col */}


        </div>
        <div className="col-lg-12">
          <h3 className="mb30">Detailed Information</h3>
        </div>
        <div className="row">

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyASize">Area Size</label>
              <Form.Item name={"areaSize"} initialValue={persistedProperties?.data.detailProperty?.areaSize}>
                <input type="text" className="form-control" id="propertyASize" />

              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="sizePrefix">Size Prefix</label>
              <Form.Item name={"prefixSize"} initialValue={persistedProperties?.data.detailProperty?.prefixSize} >
                <input type="text" className="form-control" id="sizePrefix" />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="landArea">Land Area</label>
              <Form.Item name={"landArea"} initialValue={persistedProperties?.data.detailProperty?.landArea} >
                <input type="text" className="form-control" id="landArea" />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="LASPostfix">Land Area Size Postfix</label>
              <Form.Item name={"landAreaPostfixSize"} initialValue={persistedProperties?.data.detailProperty?.landAreaPostfixSize} >
                <input type="text" className="form-control" id="LASPostfix" />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="bedRooms">Bedrooms</label>
              <Form.Item name={"bedRooms"} initialValue={persistedProperties?.data.detailProperty?.bedRooms} >
                <input type="text" className="form-control" id="bedRooms" />

              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="bathRooms">Bathrooms</label>
              <Form.Item name={"bathrooms"} initialValue={persistedProperties?.data.detailProperty?.bathrooms}>
                <input type="text" className="form-control" id="bathRooms" />
              </Form.Item>

            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="garages">Garages</label>
              <Form.Item name={"garages"} initialValue={persistedProperties?.data.detailProperty?.garages}>
                <input type="text" className="form-control" id="garages" />
              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="garagesSize">Garages Size</label>
              <Form.Item name={"garagesSize"} initialValue={persistedProperties?.data.detailProperty?.garagesSize}>
                <input type="text" className="form-control" id="garagesSize" />

              </Form.Item>
            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="videoUrl">Video URL</label>
              <Form.Item name={""}>
                <input type="text" className="form-control" id="videoUrl" />

              </Form.Item>
            </div>
          </div> */}
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="virtualTour">360° Virtual Tour</label>
              <input type="text" className="form-control" id="virtualTour" />
            </div>
          </div> */}

          <div className="col-xl-12">
            <h4 className="mb10">Amenities</h4>
          </div>

          <div className="col-xxs-6 col-sm col-lg col-xl">
            <ul className="ui_kit_checkbox selectable-list">
              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name={"isAirConditioning"} valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.airConditioning}>
                    <Checkbox>Air Conditioning</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isLawn" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.lawn}>
                    <Checkbox>Lawn</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isSwimmingPool" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.swimmingPool}>
                    <Checkbox>Swimming Pool</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}
            </ul>
          </div>
          {/* End .col */}

          <div className="col-xs-6 col-sm col-lg col-xl">
            <ul className="ui_kit_checkbox selectable-list">
              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isBarbeque" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.barbeque}>
                    <Checkbox>Barbeque</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isMicrowave" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.microwave}>
                    <Checkbox>Microwave</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isTvCables" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.tvCable}>
                    <Checkbox>TV Cable</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}
            </ul>
          </div>
          {/* End .col */}

          <div className="col-xs-6 col-sm col-lg col-xl">
            <ul className="ui_kit_checkbox selectable-list">
              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isDryer" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.dryer}>
                    <Checkbox>Dryer</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isOutdoorShower" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.outdoorShower}>
                    <Checkbox>Outdoor Shower</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isWasher" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.washer}>
                    <Checkbox>Washer</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}
            </ul>
          </div>
          {/* End .col */}

          <div className="col-xxs-6 col-sm col-lg col-xl">
            <ul className="ui_kit_checkbox selectable-list">
              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isGym" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.gym}>
                    <Checkbox>Gym</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isRefrigerator" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.refrigerator}>
                    <Checkbox>Refrigerator</Checkbox>
                  </Form.Item>

                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isWifi" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.wifi}>
                    <Checkbox>WiFi</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}
            </ul>
          </div>
          {/* End .col */}

          <div className="col-xxs-6 col-sm col-lg col-xl">
            <ul className="ui_kit_checkbox selectable-list">
              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isLaundry" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.laundry}>
                    <Checkbox>Laundry</Checkbox>
                  </Form.Item>

                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isSauna" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.sauna}>
                    <Checkbox>Sauna</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}

              <li>
                <div className="form-check custom-checkbox">
                  <Form.Item name="isWindowCoverings" valuePropName="checked" initialValue={persistedProperties?.data.detailProperty?.windowCoverings}>
                    <Checkbox>Window Coverings</Checkbox>
                  </Form.Item>
                </div>
              </li>
              {/* End li */}
            </ul>
          </div>
        </div>

        <div className="col-lg-12">
          <h3 className="mb30">Property media</h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="mb-0">
              {propertySelectedImgs.length > 0
                ? propertySelectedImgs?.map((item, index) => (
                  <li key={index} className="list-inline-item">
                    <div className="portfolio_item">
                      <Image
                        width={200}
                        height={200}
                        className="img-fluid cover"
                        src={item}
                        alt="fp1.jpg"
                      />
                      <div
                        className="edu_stats_list"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                        data-original-title="Delete"
                      >
                        <a onClick={() => deleteImage(item)}>
                          <span className="flaticon-garbage"></span>
                        </a>
                      </div>
                    </div>
                  </li>
                ))
                : undefined}

              {/* End li */}
            </ul>
          </div>
          {/* End .col */}

          <div className="col-lg-12">
            <div className="portfolio_upload">
              <input
                type="file"
                onChange={multipleImage}
                multiple
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              <div className="icon">
                <span className="flaticon-download"></span>
              </div>
              <p>Drag and drop images here</p>
            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-xl-6">
            <div className="resume_uploader mb30">
              <h3>Attachments</h3>
              <form className="form-inline d-flex flex-wrap wrap">
                <input className="upload-path" />
                <label className="upload">
                  <input type="file" />
                  Select Attachment
                </label>
              </form>
            </div>
          </div> */}
          {/* End .col */}
        </div>

        {/* 
        <div className="col-lg-12">
          <h3 className="mb30">Floor Plans</h3>
          <button className="btn admore_btn mb30">Add More</button>
        </div> */}


        {/* <div className="row">
          <div className="col-xl-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="planDsecription">Plan Description</label>
              <input type="text" className="form-control" id="planDsecription" />
            </div>
          </div> */}
        {/* End .col */}

        {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="planBedrooms">Plan Bedrooms</label>
              <input type="text" className="form-control" id="planBedrooms" />
            </div>
          </div> */}
        {/* End .col */}
        {/* 
          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="planBathrooms">Plan Bathrooms</label>
              <input type="text" className="form-control" id="planBathrooms" />
            </div>
          </div> */}
        {/* End .col */}

        {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="planPrice">Plan Price</label>
              <input type="text" className="form-control" id="planPrice" />
            </div>
          </div> */}
        {/* End .col */}

        {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="planPostfix">Price Postfix</label>
              <input type="text" className="form-control" id="planPostfix" />
            </div>
          </div> */}
        {/* End .col */}

        {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="planSize">Plan Size</label>
              <input type="text" className="form-control" id="planSize" />
            </div>
          </div> */}
        {/* End .col */}

        {/* <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label>Plan Image</label>
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    className="btn btn-thm"
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                  />
                  <label htmlFor="imageUpload"></label>
                </div>
                <div className="avatar-preview">
                  <div id="imagePreview"></div>
                </div>
              </div>
            </div>
          </div> */}
        {/* End .col */}

        {/* <div className="col-xl-12">
            <div className="my_profile_setting_textarea mt30-991">
              <label htmlFor="planDescription">Plan Description</label>
              <textarea
                className="form-control"
                id="planDescription"
                rows="7"
              ></textarea>
            </div>
          </div> */}
        {/* End .col */}

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

export default UpdateProperty;
