const Button = (props: Props) => {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.click}
        className="button-class inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-fit h-fit"
      >
        {props.href ? <a href={props.href}>{props.title}</a> : props.title}
      </button>
    </>
  );
};

type Props = {
  title: any;
  href?: string;
  disabled?: boolean;
  click?: () => any;
};

export default Button;
