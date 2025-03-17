interface Props {
    fill?:string
}

const IconDashboard = (props: Props)=>{
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
                id="mask0_220_148"
                style={{ maskType: "alpha" }}
                width="24"
                height="25"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
            >
                <path fill="url(#pattern0_220_148)" d="M0 0.5H24V24.5H0z"></path>
            </mask>
            <g mask="url(#mask0_220_148)">
                <path fill={props.fill} d="M0 1H24V25H0z"></path>
            </g>
            <defs>
                <pattern
                id="pattern0_220_148"
                width="1"
                height="1"
                patternContentUnits="objectBoundingBox"
                >
                <use transform="scale(.04167)" xlinkHref="#image0_220_148"></use>
                </pattern>
                <image
                id="image0_220_148"
                width="24"
                height="24"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABKElEQVR4nN2UwU4CQQyGv5DAs5iAJzwpvoIiIftKio/hgr4RIuCZ4HH1KmMm6SYT7Exnlxt/0mR32/6d/actnDt6QAG8AivgR2wl3wqJaYUJ8Ak4w7bAQxPiDvAcIbsGRhHfTHJNxMidkN8m/LMcWcLT3hjy7IHh0V+NY+S9I81HCTlq8oHkXgXfN0BXK1BkXKhTyAfyHvqnWoG3TPIv4FJyLoCdEjPXCnwYxL9ACfQTJ6/Nz8k/VEYrlkFsXyEP86pUgVgrlkHs3Gjhqo1EByFeyHMqVpVo0aCLnGEvp7apM2waG7Rtw0l2Stw6NmjIVsydZKfE+bu544Rl5wx7JAMd2YpNiA/AU+66rjGWxWWRe83vaYmudITv/3fgW2wpg+d90Qs9D/wBua8Q2+98PRMAAAAASUVORK5CYII="
                ></image>
            </defs>
        </svg>
    )
}


export default IconDashboard