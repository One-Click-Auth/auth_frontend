import './spinner.css';
type spinnerProps = {
  size: number;
  color: string;
  opacity?: number;
};
const Spinner = ({ size, color, opacity }: spinnerProps) => {
  return (
    <svg
      className="spinner animate-spin"
      stroke={color}
      opacity={opacity}
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
