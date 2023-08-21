import './spinner.css';
type spinnerProps = {
  size: number;
  color: string;
};
const Spinner = ({ size, color }: spinnerProps) => {
  return (
    <svg
      className="spinner animate-spin"
      stroke={color}
      strokeLinecap="round"
      width={size}
      height={size}
      viewBox="0 0 50 50"
    >
      <circle
        className="path"
        stroke={color}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  );
};
export default Spinner;
