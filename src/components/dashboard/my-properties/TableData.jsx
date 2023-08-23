import Image from "next/image";
import properties from "../../../data/properties";
import { useDeleteByIdPropertyMutation, useGetPropertiesQuery } from "../../../features/properties/propertiesApi";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { addSelectedProperty,  } from "../../../features/properties/propertiesSlice";
import { notification } from "antd";
import { useEffect } from "react";

const TableData = () => {
  const persistedProperties = useSelector((state) => state.persistedReducer.properties.data);
  const dispatch = useDispatch();
  const [deleteByIdProperty, { isSuccess}] = useDeleteByIdPropertyMutation()
  const { refetch,  data, isLoading, isError, error} = useGetPropertiesQuery()

  const selectedItem = (id) => {
    dispatch(addSelectedProperty(persistedProperties?.find((item) => item.id == id)));
  }
  const deleteItem = (id) => {
    deleteByIdProperty(id).then((res)=>{
      if(res.status == 200) {
        
      }
    })
  }
  useEffect(()=>{
    if(isSuccess) {
      notification.success({message:"Successfully Delete!!"})
      refetch()
    }
  },[isSuccess])
  let theadConent = [
    "Listing Title",
    // "Date published",
    "Status",
    // "View",
    "Action",
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.status }</div>;
  }
  let tbodyContent = data.data?.map((item) => (
    <tr key={item.id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="thumb">
            <Image
              width={150}
              height={220}
              className="img-whp cover"
              src={item.listImages[0]}
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">For Rent</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>{item.propertyTitle}</h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.address}
              </p>
              <a className="fp_price text-thm" href="#">
                ${item.price}
                <small>/mo</small>
              </a>
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      {/* <td>30 December, 2020</td> */}
      {/* End td */}

      <td>
        <span className="status_tag badge">{item.status==0? "Rent":"Pending"}</span>
      </td>
      {/* End td */}

      {/* <td>2,345</td> */}
      {/* End td */}

      <td>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <Link onClick={()=>selectedItem(item.id)} href={`/update-property/${item.id}`}>
              <span className="flaticon-edit"></span>
            </Link>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <div className="" onClick={()=>deleteItem(item.id)}>
              <span className="flaticon-garbage"></span>
            </div>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
