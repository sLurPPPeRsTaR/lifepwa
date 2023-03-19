import propType from 'prop-types';

export default function Component({ className }){
    return(
        <svg className={`"animate-spin h-5 w-5 bg-[#ED1C24] text-[#ED1C24]" ${className}`}>

        </svg>
    )
}

const defaultProps = {
    className: "",
}

const propTypes = {
    className: propType.string,
}

Component.defaultProps = defaultProps
Component.propTypes = propTypes



