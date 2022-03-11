import { useEffect, useState } from "react";

const ResourceCard = (props) => {
  const name = props.name;
  const likes = props.likes;
  const dislikes = props.dislikes;
  const link = props.link;
  const lang = props.language;
  const price = props.price === "0" ? "رایگان" : props.price;
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);

  async function handleLike() {
    setLikesCount(+likes + 1);

    const response = fetch(
      `/api/resource/like/?name=${props.name}&id=${props.id}`,
      {
        method: "POST",
      }
    );
  }
  async function handleDislike() {
    setDislikesCount(+dislikes + 1);

    const response = fetch(
      `/api/resource/dislike/?name=${props.name}&id=${props.id}`,
      {
        method: "POST",
      }
    );
  }

  return (
    <div className="customCard resourceCard">
      <div className="name">
        <a href={link}>{name}</a>
      </div>
      <div className="detail">
        <p>
          <span> قیمت </span> <span> {price} </span>
        </p>
        <p>
          <span> زبان </span> <span> {lang} </span>
        </p>
      </div>
      <div className="likeness">
        <p>
          {likesCount}

          <button type="button" onClick={handleLike} className="like">
            <i className="fas fa-heart"></i>
          </button>
        </p>
        <p>
          {dislikesCount}
          <button type="button" onClick={handleDislike} className="dislike">
            <i className="fas fa-heart-broken"></i>
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResourceCard;
