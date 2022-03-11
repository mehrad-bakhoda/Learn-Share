const Loading = ({state}) => {
  return (
    <div className={`loading ${state}`}>
      <i className="far fa-spinner fa-spin" />
    </div>
  );
};

export default Loading;
