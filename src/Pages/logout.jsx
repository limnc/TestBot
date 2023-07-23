import Cookies from "js-cookie";
import { useEffect } from "react";
const Logout = () =>{

    useEffect(()=>{
        Cookies.remove("agentID")
        Cookies.remove("agentName")
        window.location.href = '/login'
    },[])
}

export default Logout