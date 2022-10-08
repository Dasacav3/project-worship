const Card = (props: Props) => {
  return (
    <div className="wrapper wrapperAnime">
      <div className="header">
        <div className="imageWrapper">
          {props.type === 'image' ? (
            <img src={props.path} alt="image" />
          ) : (
            <video src={props.path} preload="metadata" />
          )}
        </div>
      </div>
      <div className="textWrapper">
        <h1 className="text">{`${props.order}. ${props.title}`}</h1>
      </div>
    </div>
  );
};

interface Props {
  title: string;
  likes: number;
  order: number;
  path: string;
  type: string;
}

export default Card;
