import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewUser() {
    const [user, setUser] = useState({});
    const {id} = useParams();

    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/user/${id}`);
        const data = await response.json();
        setUser(data);
        console.log(data);
    }

    useEffect(() => {
        getUser();
    },[]);

    return (
                <div>
                    <a href="/usermanagement">
                    <button className="button" >Back</button>
                    </a>
                    <h1>User Name:  {user.username}</h1>
                    <h3>Email ID : {user.emailid}</h3>
                </div>
    )
}

export default ViewUser
