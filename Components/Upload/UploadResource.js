import { useRouter } from "next/dist/client/router";

const UploadResource = () => {
  const { query } = useRouter();
  return (
    <div className="customCard uploadCard">
      <form
        action={`../api/resource/post/?category=${query.category}&subject=${query.subject}`}
        method="POST"
      >
        <h4>افزودن منبع جدید</h4>
        <input type="text" name="title" placeholder="نام  منبع" />

        <input type="text" name="url" placeholder="لینک منبع" />

        <input type="text" name="price" placeholder="قيمت" />

        <input type="text" name="language" placeholder="زبان" />

        <div className="buttons">
          <button type="submit">افزودن منبع جدید</button>
        </div>
      </form>
    </div>
  );
};

export default UploadResource;
