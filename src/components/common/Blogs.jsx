import Link from "next/link";
import { formatDate1 } from "../../utils/formatDateUtils";
import Image from "next/image";
import { useGetArticlesAllQuery } from "../../features/articles/articlesApi";
const Blogs = () => {

  const { isLoading, data, isError, error, status } = useGetArticlesAllQuery()
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.status }</div>;
  }
  return (
    <>
      {data.data.slice(0, 3).map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className="for_blog feat_property">
            <div className="thumb">
              <Link href={`/blog-details/${item.id}`}>
                <Image
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={item.img}
                  alt="bh1.jpg"
                />
              </Link>
            </div>
            <div className="details">
              <div className="tc_content">
                <p className="text-thm">{item.topic.name}</p>
                <h4>
                  <Link href={`/blog-details/${item.id}`}>{item.title}</Link>
                </h4>
              </div>
              <div className="fp_footer">
                {/* <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <Link href="/agent-v2">
                      <Image
                        width={40}
                        height={40}
                        src={item.posterAvatar}
                        alt="pposter1.png"
                      />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/agent-v2">{item.posterName}</Link>
                  </li>
                </ul> */}
                <a className="fp_pdate float-end" href="#">
                  {formatDate1(item.createdDate)}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blogs;
