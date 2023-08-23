import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import Image from "next/image";
import { useGetPropertiesQuery } from "../../features/properties/propertiesApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addData, addSelectedProperty } from "../../features/properties/propertiesSlice";
const FeaturedProperties = () => {
  const dispatch  = useDispatch()
  const { isLoading, data, error,status } = useGetPropertiesQuery()
  const persistedProperties = useSelector((state) => state.persistedReducer.properties.data);




  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const selectedItem = (id) => {
    dispatch(addSelectedProperty(persistedProperties?.find((item) => item.id == id)));
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message }</div>;
  }
  dispatch(addData(data.data))

  let content = data.data?.slice(0, 12)?.map((item) => (
    <div className="item" key={item.id}>
      <div className="feat_property">
        <div className="thumb">
          <Image
            width={343}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={item.listImages[0]}
            alt="fp1.jpg"
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              {item.saleTag?.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">{val}</a>
                </li>
              ))}
            </ul>
            {/* End .tag */}

            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-transfer-1"></span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>
            {/* End .icon */}

            <Link onClick={()=>selectedItem(item.id)} href={`/listing-details-v1/${item.id}`} className="fp_price">
              ${item.price}
              <small>/mo</small>
            </Link>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.propertyType?.name}</p>
            <h4>
              <Link onClick={()=>selectedItem(item.id)} href={`/listing-details-v1/${item.id}`}>{item.propertyTitle}</Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.address}
            </p>

            <ul className="prop_details mb0">

              <li className="list-inline-item" >
                <a href="#">
                  {"Beds"}: {item.detailProperty.bedRooms}
                </a>

              </li>
              <li className="list-inline-item" >
                <a href="#">
                  {"Baths"}: {item.detailProperty.bathrooms}
                </a>
              </li>
              <li className="list-inline-item" >
                <a href="#">
                  {"Garages"}: {item.detailProperty.garages}
                </a>
              </li>


            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              <li className="list-inline-item">
                <Link href="/agent-v2">
                  <Image
                    width={40}
                    height={40}
                    src={item.listImages[0]}
                    alt="pposter1.png"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/agent-v2">{item?.user?.userName}</Link>
              </li>
            </ul>
            {/* <div className="fp_pdate float-end">{item.createdTime}</div> */}
          </div>
          {/* End .fp_footer */}
        </div>
        {/* End .details */}
      </div>
    </div>
  ));

  return (
    <>
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>


    </>
  );
};

export default FeaturedProperties;
