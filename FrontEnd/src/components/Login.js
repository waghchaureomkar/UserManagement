import React,{useState,} from 'react'
// import {Row,Form,Col} from 'react-bootstrap'
import axios from 'axios'
import { useHistory} from 'react-router';

function Login() {
    const url = "http://localhost:5000/login";
    const history = useHistory();
    const [data,setData] = useState({
        emailid: "",
        password: ""
    });

    async function submit(e){
        
        e.preventDefault();
        console.log(data);
        axios.post(url,{
            emailid:data.emailid,
            password: data.password
        })
        .then(res => {
            if(res.data){
                alert(`${res.data.username} is login succesfully`)
                history.push('./usermanagement');
            }else{
                alert("wrong Email or password")
            }
            
        }) ;

        setData({
            emailid: "",
            password: ""
        })

    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }


    return (
        <div className="component container">
            <div className="login-wrapper">
            <h1>Please Log In</h1>
                <form onSubmit={(e)=> submit(e)}  className="login-wrapper"  >
                    <label className="margin">
                        <p>Email id</p>
                        <input type="email"  id="emailid"  value={data.emailid} 
                        onChange={(e)=>handle(e)} />
                    </label>
                    <label className="margin">
                        <p>Password</p>
                        <input type="password"  id="password" value={data.password}
                        onChange={(e)=>handle(e)} />
                    </label>
                    <div >
                        <button  className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
