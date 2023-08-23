import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateArticle from "../../components/create-article/index";

const index = () => {

  return (
    <>
      <Seo pageTitle="Create Article" />
      <CreateArticle />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
