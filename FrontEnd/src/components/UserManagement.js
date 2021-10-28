import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {Table} from "react-bootstrap";


function UserManagement() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await fetch("http://localhost:5000/users");
        // const data = await response.json();
        setUsers(await response.json());
        // console.log(data);

    }

    useEffect(() => {
        getUsers();
    },[]);

    const deleteUser = async (id) => {
        const d = window.confirm("press ok to delete user");
        if(d==true){
            await axios.delete(`http://localhost:5000/${id}`);
            getUsers();
        } 
    }


    return (
        <div className="component container">
            <div>
                <h3>User List</h3>
                <Table striped bordered hover >
                    <thead>
                    <tr>    
                        <th>User Name</th>
                        <th>Email ID</th>
                        <th>Actions</th>
                    </tr>
                    </thead>


                    {
                        users.map((data)=> {
                            return(
                                <tr>
                                    <td>{data.username}</td>
                                    <td>{data.emailid}</td>
                                    <td>
                                    <a href={`/viewuser/${data.id}`}>
                                        <button className="btn" >View</button></a>
                                    <a href={`/edituser/${data.id}`}>
                                        <button className="btn" >Edit</button></a>

                                        <button className="btn" onClick={()=> deleteUser(data.id)} >Delete</button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                    
                </Table>
            </div>
            <div>
                <a href="/adduser">
                <button className="button" >Add User</button>
                </a>
                <a href="/login">
                <button className="button" >logout</button>
                </a>
            </div>
            
        </div>
    )
}

export default UserManagement
