import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

interface Props{
    title:string,
    description:string,
    icon?:string,
    callback():void
}

export default function ConfirmationModal(props:Props){
    // props.onClick
    // console.log(props, "props.icon...")
    MySwal.fire({
        'title': props.title || 'Confirmation',
        text: props.description || 'Are you sure to do this action?',
        icon: 'error',
        customClass: {
            cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
            confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
        },
        buttonsStyling: false
    }).then(()=>{
        props.callback()
    }).catch(err=>{
        throw err
    })
}