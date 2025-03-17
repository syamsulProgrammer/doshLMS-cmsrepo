interface Props {
    fill?:string
}

const IconFolder = (props: Props)=>{
    return(
        <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      fill={props.fill}
      viewBox="0 0 24 24"
    >
      <mask
        id="mask0_220_153"
        style={{ maskType: "alpha" }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="url(#pattern0_220_153)" d="M0 0H24V24H0z"></path>
      </mask>
      <g mask="url(#mask0_220_153)">
        <path fill={props.fill} d="M0 0.5H24V24.5H0z"></path>
      </g>
      <defs>
        <pattern
          id="pattern0_220_153"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.03333)" xlinkHref="#image0_220_153"></use>
        </pattern>
        <image
          id="image0_220_153"
          width="30"
          height="30"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbUlEQVR4nO2WMQqAQAwEp/Q3fsPDZ4sfsLe5+I9YXacoSIzCDmw9kNwlAZHACGyAH2QB+iixnUhbVqCLEHtwDCgZYgdqltgjWvU/5hfKPH2qxy4xKjV6XOg7uQYIN0amZR0CJVhegeHhBhWCS3bUJd7kx8MU4QAAAABJRU5ErkJggg=="
        ></image>
      </defs>
    </svg>
    )
}


export default IconFolder