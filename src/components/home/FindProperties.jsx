import Link from "next/link";
import findProperties from "../../data/findProperties";
import Image from "next/image";
import { useGetFeaturesbyCityQuery } from "../../features/properties/propertiesApi";
import Router from "next/router";

const FindProperties = () => {
  const {data,isLoading, isError} =  useGetFeaturesbyCityQuery()
  const list = [
    {
      column: "col-lg-4 col-xl-4",
      width:361,
      height:350

    },
    {
      column: "col-lg-8 col-xl-8",
      width:748,
      height:350

    },
    {
      column: "col-lg-8 col-xl-8",
      width:748,
      height:350

    },
    {
      column: "col-lg-4 col-xl-4",
      width:361,
      height:350

    }]


  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    Router.push("/404.js")
  }
  const result = []
  for (let i = 0; i < list.length; i++) {
    const item = { ...data.data[i], ...list[i] };
    result.push(item);
  }
  return (
    <>
      {result.map((item,index) => (
        <div key={index} className={`col-lg-4 ${item.column}`}>
          <Link href={`/listing-grid-v1/${item.name}`} className="properti_city d-block">
            <div className="thumb" style={{width:item.width, height:item.height}}>
              <Image
                width={752}
                height={352}
                className="img-fluid w100 h-100 cover"
                src={item.img}
                alt="pc1.jpg"
              />
            </div>
            <div className="overlay">
              <div className="details">
                <h4>{item.name}</h4>
                <p>{item.number} Properties</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default FindProperties;
