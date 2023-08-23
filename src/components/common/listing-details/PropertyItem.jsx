import { useSelector } from "react-redux";

const PropertyItem = () => {

  const persistedProperties = useSelector((state) => state.persistedReducer.properties);

  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{persistedProperties.selectedProperty.propertyType.name}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Beds: {persistedProperties.selectedProperty.detailProperty.bedRooms}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Baths: {persistedProperties.selectedProperty.detailProperty.bathrooms}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Sq Ft: {persistedProperties.selectedProperty.detailProperty.landArea}</a>
      </li>
    </ul>
  );
};

export default PropertyItem;
