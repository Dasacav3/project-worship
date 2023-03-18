import Button from './Button';

const Card = (props: Props) => {
  return (
    <div className="wrapper wrapperAnime" onClick={props.click}>
      <div className="header">
        <div className="imageWrapper">
          {props.type === 'image' ? (
            <img src={props.path} alt="image" />
          ) : (
            <video src={props.path} preload="metadata" />
          )}
        </div>
      </div>
      <div className="textWrapper flex justify-center">
        <Button
          title={<span className="material-icons">delete_forever</span>}
          click={event => props.delete(event, props.id)}
        />
      </div>
    </div>
  );
};

interface Props {
  id: string;
  title: string;
  order: number;
  path: string;
  type: string;
  delete: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  click?: () => void;
}

export default Card;
