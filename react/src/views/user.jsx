import { useEffect, useState } from "react"
import axiosClient from "../axios-client";

export default function User(){
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        getUser();
    },[])
    const getUser = () => {
        setLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false)
            console.log(data);
        })
        .catch(()=>{
            setLoading(false)
        })
    }
    return (
        <div>
            Users
        </div>
    )
}