import UploadSubject from "../../Components/UploadSubject";
import UploadCategory from "../../Components/UploadCategory";
import UploadResource from "../../Components/UploadResource";

import { useRouter } from "next/router";

const UploadPage = () => {
  const router = useRouter();
  const { uploadType } = router.query;
  return (
    <div className="uploadPage innerPage">
      {uploadType === "category" && <UploadCategory />}
      {uploadType === "subject" && <UploadSubject />}
      {uploadType === "resource" && <UploadResource />}
    </div>
  );
};

export default UploadPage;
