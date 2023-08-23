import { useSelector } from "react-redux";

const PropertyFeatures = () => {

  const persistedProperties = useSelector((state) => state.persistedReducer.properties.selectedProperty.detailProperty);

  const propertyFeatures = [
    {
      id: 1,
      list: [{name:"Air Conditioning", available:persistedProperties.airConditioning}, {name:"Barbeque",  available:persistedProperties.barbeque}, {name:"Dryer", available:persistedProperties.dryer} , {name:"Gym", available:persistedProperties.gym}, {name: "Laundry", available:persistedProperties.laundry} ],
    },
    {
      id: 2,
      list: [{name:"Lawn",available:persistedProperties.lawn}, {name:"Microwave",available:persistedProperties.microwave}, {name:"Outdoor Shower",available:persistedProperties.outdoorShower}, {name:"Refrigerator",available:persistedProperties.refrigerator}, {name:"Sauna", available:persistedProperties.sauna}],
    },
    {
      id: 3,
      list: [{name:"Swimming Pool",available:persistedProperties.swimmingPool}, {name:"TV Cable",available:persistedProperties.tvCable}, {name:"Washer",available:persistedProperties.washer}, {name:"WiFi",available:persistedProperties.wifi},{name: "Window Coverings",available:persistedProperties.windowCoverings}],
    },
  ];
  return (
    <>
      {propertyFeatures.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
          <ul className="order_list list-inline-item">
            {item.list.map((val, i) => (
              <li key={i}>
                {val.available?<span className="flaticon-tick"></span>:<></>}
                {val.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyFeatures;
