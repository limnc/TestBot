import { useState,useEffect } from "react";

const Alert = ({status,message,display}) =>{
    const [isShow,setIsShow] = useState(false)

    useEffect(()=>{
        setIsShow(true)
        setTimeout(() => {
            setIsShow(false)
        }, 2000);
        display = false
    },[display])

    return(
        <div>
            {
                isShow ?
                status === 'success'? <div className="alert alert-success">{message}</div>
                : <div className="alert alert-danger">{message}</div>
                :''
            }
        </div>    
    )
}

export default Alert