import { Svg, Path } from "react-native-svg";

const AuthTop = ({ style, ...props }) => {
  return (
    <Svg
      width="216"
      height="145"
      viewBox="0 0 216 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <Path
        d="M81.0794 71.7012C161.787 75.6289 188.017 250.661 344.628 44.0012C501.238 -162.659 179.064 -118.741 67.0726 -61.5647C-44.919 -4.38788 0.371938 67.7735 81.0794 71.7012Z"
        fill="#1D84B5"
      />
    </Svg>
  );
};

export default AuthTop;
