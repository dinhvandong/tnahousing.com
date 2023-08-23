import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import UpdateProperty from "../../components/dashboard/my-properties/UpdatePropertyMain";
const index = () => {
  return (
    <>
      <Seo pageTitle="Create Listing" />
      <UpdateProperty />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
