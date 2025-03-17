import { useCallback, useEffect, useRef } from "react"
import { X } from "react-feather"

function useOnClickOutside(ref:any, handler:any) {
    useEffect(() => {
      const listener = (event:any) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
  
        handler(event);
      };
  
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
  
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

const ResetPasswordModal = (props:any)=>{
    const divRef = useRef()
    const handler = useCallback(() => console.log(`Click Outside`), []);
    useOnClickOutside(divRef, handler);
    return(
        <div className={`${props.show ? 'block bg-black/30 backdrop-opacity-5' : 'hidden'} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0`}>
            <div className="blur-none bg-white px-12 py-16 rounded-lg w-1/3 text-center">
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Forgot Password</h2>
                    <p className="text-sm">Please contact admin to reset your password</p>
                    <button onClick={()=>props.onClose()} className="bg-primary p-3 w-full rounded text-white font-bold">
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordModal