import Image from "next/image";
import { useSelector } from "react-redux";

const Creaator = () => {
  const persistedProperties = useSelector((state) => state.persistedReducer.properties.selectedProperty);

  return (
    <div className="media d-flex">
      <Image
        width={90}
        height={90}
        className="me-3"
        src={persistedProperties.user.avatar}
        alt="lc1.png"
      />
      <div className="media-body">
        <h5 className="mt-0 mb0">{persistedProperties.user.fullName}</h5>
        <p className="mb0">{persistedProperties.user.phoneNumber}</p>
        <p className="mb0">{persistedProperties.user.email}</p>
        {/* <a className="text-thm" href="#">
          View My Listing
        </a> */}
      </div>
    </div>
  );
};

export default Creaator;
