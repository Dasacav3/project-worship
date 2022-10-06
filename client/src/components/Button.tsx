const Button = (props: Props) => {
  return (
    <>
      <button className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
        {props.title}
      </button>
    </>
  );
};

type Props = {
  title: string;
};

export default Button;