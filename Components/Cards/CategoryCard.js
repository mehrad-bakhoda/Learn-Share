const CategoryCard = (props) => {
  const name = props.name;
  const followers = props.followers;
  const subjects = props.subjects;
  return (
    <div className="customCard categoryCard">
      <h4>{name}</h4>
      <div className="followers">
        <p> {followers ? "0" : `${followers}`} </p>
        <i className="far fa-users"></i>
      </div>
      <div className="subjects">
        <p> {subjects} </p>
        <i className="far fa-tags"></i>
      </div>
    </div>
  );
};

export default CategoryCard;
