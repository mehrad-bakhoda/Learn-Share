import { useRouter } from "next/dist/client/router";

function UploadSubject() {
  const { query } = useRouter();
  return (
    <div className="customCard uploadCard">
      <h4>طرح موضوع جدید</h4>
      <form
        action={`../api/subject/post?category=${query.category}`}
        method="POST"
      >
        <input type="text" name="title" placeholder="نام دسته بندی"></input>
        <div className="buttons">
          <button type="submit">طرح موضوع</button>
        </div>
      </form>
    </div>
  );
}

export default UploadSubject;
