function UploadCategory() {
  return (
    <div className="customCard uploadCard">
      <h4>ایجاد دسته بندی جدید</h4>
      <form action="../api/category/post" method="POST">
        <input name="title" type="text" placeholder="نام دسته بندی" />
        <div className="buttons">
          <button type="submit">ایجاد دسته بندی</button>
        </div>
      </form>
    </div>
  );
}

export default UploadCategory;
