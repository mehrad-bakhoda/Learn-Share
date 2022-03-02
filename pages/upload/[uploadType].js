import UploadSubject from "../../Components/UploadSubject";
import UploadCategory from "../../Components/UploadCategory";
import UploadResource from "../../Components/UploadResource";
import Head from "next/head";

import { useRouter } from "next/router";

const UploadPage = () => {
  const router = useRouter();
  const { uploadType } = router.query;
  return (
    <div className="uploadPage innerPage">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8"></meta>
        <title>Upload {uploadType}</title>
      </Head>
      {uploadType === "category" && <UploadCategory />}
      {uploadType === "subject" && <UploadSubject />}
      {uploadType === "resource" && <UploadResource />}
    </div>
  );
};

export default UploadPage;
