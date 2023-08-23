import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength, addSelectedProperty } from "../../../features/properties/propertiesSlice";
import properties from "../../../data/properties";
import Image from "next/image";
import { useFindAllByCityQuery } from "../../../features/properties/propertiesApi";
import { useRouter } from "next/router";
import { useState } from "react";

const FeaturedItem = () => {
  const router = useRouter();
  const name = router.query.name;

  const { data, isLoading, isError, isSuccess } = useFindAllByCityQuery({ name })
  const persistedProperties = useSelector((state) => state.persistedReducer.properties.data);

  // const {
  //   keyword,
  //   location,
  //   status,
  //   propertyType,
  //   price,
  //   bathrooms,
  //   bedrooms,
  //   garages,
  //   yearBuilt,
  //   area,
  //   amenities,
  // } = useSelector((state) => state.properties);
  // const { statusType, featured, isGridOrList } = useSelector(
  //   (state) => state.filter
  // );

  const dispatch = useDispatch();
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    router.push("/404.js")
  }
  // setDataState(data.data)
  dispatch(addLength(data.data.length));

  // keyword filter
  const keywordHandler = (item) =>
    item.propertyTitle.toLowerCase().includes(data.data.propertyTitle?.toLowerCase());

  // location handler
  const locationHandler = (item) => {
    return item.data.toLowerCase().includes(data.data.address.toLowerCase());
  };

  // status handler
  const statusHandler = (item) =>
    item.type.toLowerCase().includes(status.toLowerCase());

  // properties handler
  const propertiesHandler = (item) =>
    item.type.toLowerCase().includes(propertyType.toLowerCase());

  // price handler
  const priceHandler = (item) =>
    item.price < price?.max && item.price > price?.min;

  // bathroom handler
  const bathroomHandler = (item) => {
    if (bathrooms !== "") {
      return item.itemDetails[1].number == bathrooms;
    }
    return true;
  };

  // bedroom handler
  const bedroomHandler = (item) => {
    if (bedrooms !== "") {
      return item.itemDetails[0].number == bedrooms;
    }
    return true;
  };

  // garages handler
  const garagesHandler = (item) =>
    garages !== ""
      ? item.garages?.toLowerCase().includes(garages.toLowerCase())
      : true;

  // built years handler
  const builtYearsHandler = (item) =>
    yearBuilt !== "" ? item?.built == yearBuilt : true;

  // area handler
  const areaHandler = (item) => {
    if (area.min !== 0 && area.max !== 0) {
      if (area.min !== "" && area.max !== "") {
        return (
          parseInt(item.itemDetails[2].number) > area.min &&
          parseInt(item.itemDetails[2].number) < area.max
        );
      }
    }
    return true;
  };

  // advanced option handler
  const advanceHandler = (item) => {
    if (amenities.length !== 0) {
      return amenities.find((item2) =>
        item2.toLowerCase().includes(item.amenities.toLowerCase())
      );
    }
    return true;
  };

  // status filter
  const statusTypeHandler = (a, b) => {
    if (statusType === "recent") {
      return a.created_at + b.created_at;
    } else if (statusType === "old") {
      return a.created_at - b.created_at;
    } else if (statusType === "") {
      return a.created_at + b.created_at;
    }
  };

  // featured handler
  const featuredHandler = (item) => {
    if (featured !== "") {
      return item.featured === featured;
    }
    return true;
  };
  const selectedItem = (id) => {
    dispatch(addSelectedProperty(persistedProperties?.find((item) => item.id == id)));
  }
  // status handler
  let content = data.data
    // ?.slice(0, 10)
    // ?.filter(keywordHandler)
    // ?.filter(locationHandler)
    // ?.filter(statusHandler)
    // ?.filter(propertiesHandler)
    // ?.filter(priceHandler)
    // ?.filter(bathroomHandler)
    // ?.filter(bedroomHandler)
    // ?.filter(garagesHandler)
    // ?.filter(builtYearsHandler)
    // ?.filter(areaHandler)
    // ?.filter(advanceHandler)
    // ?.sort(statusTypeHandler)
    // ?.filter(featuredHandler)
    .map((item) => (
      <div
        className={`${true ? "col-12 feature-list" : "col-md-6 col-lg-6"
          } `}
        key={item.id}
      >
        <div
          className={`feat_property home7 style4 ${true ? "d-flex align-items-center" : undefined
            }`}
        >
          <div className="thumb">
            <Image
              width={342}
              height={220}
              className="img-whp w-100 h-100 cover"
              src={item.listImages[0]}
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">Featured</a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-capitalize">
                    {item.type == 0 ? "Rent" : "Rent"}
                  </a>
                </li>
              </ul>
              {/* <ul className="icon mb0">
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
              </ul> */}

              <Link
                href={`/listing-details-v1/${item.id}`}
                className="fp_price"
              >
                ${item.price}
                <small>/mo</small>
              </Link>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <p className="text-thm">{item.propertyType.name}</p>
              <h4>
                <Link onClick={()=>selectedItem(item.id)} href={`/listing-details-v1/${item.id}`}>
                  {item.propertyTitle}
                </Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.address}
              </p>

              <ul className="prop_details mb0">

                <li className="list-inline-item" >
                  <a href="#">
                    Beds: {item.detailProperty.bedRooms}
                  </a>
                </li>
                <li className="list-inline-item" >
                  <a href="#">
                    Baths: {item.detailProperty.bathrooms}
                  </a>
                </li>
                <li className="list-inline-item" >
                  <a href="#">
                    SqFt: {item.detailProperty.areaSize}
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
                  <Link href="/agent-v2">{item.user.fullName}</Link>
                </li>
              </ul>
              <div className="fp_pdate float-end">{item.postedYear}</div>
            </div>
            {/* End .fp_footer */}
          </div>
        </div>
      </div>
    ));

  // add length of filter items

  return <>{content}</>;
};

export default FeaturedItem;
