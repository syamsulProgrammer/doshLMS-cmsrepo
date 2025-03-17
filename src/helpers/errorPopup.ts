import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal)

interface Props{
    iconType?: string,
    message?: string
}

export const ErrorPopup = async(props:Props)=>{
    try {
        MySwal.fire({
            title: "Sorry",
            icon: "info" || props.iconType,
            text: props.message,
            customClass: {
                actions: 'flex gap-3',
                confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold',
                cancelButton: 'bg-danger p-3 rounded-lg w-48 text-white font-bold'
            },
            buttonsStyling: false
        }).then(()=>{
            return true
        }).catch(err=>{
            throw err
        })
    } catch (error) {
        throw error
    }
}