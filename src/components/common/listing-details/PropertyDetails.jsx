import { useSelector } from "react-redux";

const PropertyDetails = () => {
  const persistedProperties = useSelector((state) => state.persistedReducer.properties.selectedProperty);

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property ID : <span>{persistedProperties.id}</span>
            </p>
          </li>
          <li>
            <p>
              Price : <span>$ {persistedProperties.price}</span>
            </p>
          </li>
          <li>
            <p>
              Property Size : <span>{persistedProperties.detailProperty.areaSize} Sq Ft</span>
            </p>
          </li>
          {/* <li>
            <p>
              Year Built : <span>2016-01-09</span>
            </p>
          </li> */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Bedrooms : <span>{persistedProperties.detailProperty.bedRooms}</span>
            </p>
          </li>
          <li>
            <p>
              Bathrooms : <span>{persistedProperties.detailProperty.bathrooms}</span>
            </p>
          </li>
          <li>
            <p>
              Garage : <span>{persistedProperties.detailProperty.garages}</span>
            </p>
          </li>
          <li>
            <p>
              Garage Size : <span>{persistedProperties.detailProperty.garagesSize} SqFt</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property Type : <span>{persistedProperties.propertyType.name}</span>
            </p>
          </li>
          <li>
            <p>
              Property Status : <span>{persistedProperties.propertyType.type}</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
