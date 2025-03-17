interface Props {
    fill?:string
}

const IconUser = (props: Props)=>{
    return(
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="24"
        height="25"
        fill={props.fill}
        viewBox="0 0 24 25"
        >
            <mask
                id="mask0_220_158"
                style={{ maskType: "alpha" }}
                width="24"
                height="25"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
            >
                <path fill="url(#pattern0_220_158)" d="M0 0.5H24V24.5H0z"></path>
            </mask>
            <g mask="url(#mask0_220_158)">
                <path fill={props.fill} d="M0 0.5H24V24.5H0z"></path>
            </g>
            <defs>
                <pattern
                id="pattern0_220_158"
                width="1"
                height="1"
                patternContentUnits="objectBoundingBox"
                >
                <use transform="scale(.03333)" xlinkHref="#image0_220_158"></use>
                </pattern>
                <image
                id="image0_220_158"
                width="30"
                height="30"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0klEQVR4nO2VvWtUQRTFf5q4ChtSWIqdhTFLSGEK0/oXrJhkxUKWgAixkBQhlSm3UiHIVgp+JP4FC0tEGwXT2aRIqmACMY3Ldjb5MOGGMzAZZse3uKl8B25z7r3nvDfcOwM5cvzvOAc8Ar4Dv4FfwCLQd9bGz4CjSKwBk70wuAx81l+9F3cNOOxgbLEHXFHtB/V+klYm3AN2PcGX4u8nTF1Mq7bucT+Byt9MLwLtQKym3FwG43nV1gK+DRRSxqMRMXfU5QzGd1T7LpIbSRmPRRrqXRiXI0ftYixlPAgcBA1vlKtkMHaT/TbgD6TdEaWImA3HBeA8sJwwXVJNIRhOF6WUsRlsRJpsfw03tCZh3rjriV1fl3YSk5HGfeCq8g8ieeNQzX4kf5cMsONqBo0rui4NtyPCxqGaj0GuKc1MeKymLaAK9IsfiAi7D7Mcqq2q13IzWU3HgR3tYlGcDcxDTywWW6pxF0VRd4Bp3UoZ3gQawB/glXe0U8B2hlVyse2tlWm8lmZDHqew4O3vpq5Oa3rRhWEYz6VxCfjh7fNT/1HwG56In/gH03CaZwP+5NFYDcghFX/tgfEXaQ0H/Dcir5EbqFYPjFveNhx5YZ45cnAmOAah4jhigdmbiwAAAABJRU5ErkJggg=="
                ></image>
            </defs>
        </svg>
    )
}


export default IconUser