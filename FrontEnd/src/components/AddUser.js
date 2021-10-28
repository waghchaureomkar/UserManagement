import React,{useState} from 'react'
import {Row,Form,Col} from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router';
import validator from 'validator';


// const required = (val) => val && val.length; //value > 0
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function AddUser() {

    const url = "http://localhost:5000/user";
    const history = useHistory();
    const [emailError, setEmailError] = useState('')
    const [data,setData] = useState({
        username:"",
        emailid: "",
        password: "",
        conpassword: ""
    });

   async function submit(e){
       const pw1 = data.password;
       const pw2 = data.conpassword;

       if(pw1==pw2){
        e.preventDefault();
        console.log(data);
        axios.post(url,{
            username:data.username,
            emailid: data.emailid,
            password: data.password
        })
        .then(res => {
            console.log(res.data)
            if(res.data.added){
                alert(res.data.added)
                history.push('./usermanagement');
            }else{
                alert(res.data.msg)
            }
        })  

       }else{
           alert("password not match")
       }
        
        
        
    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)

        if (validator.isEmail(newdata.emailid)) {
          setEmailError('')
        } else {
          setEmailError('Enter valid Email!')
        }
    }



    return (
        <div>
            <div>
            <a href="/usermanagement">
            <button className="button" >Back</button>
            </a>
            <h3>User Registration</h3><br />
            </div>
            <div>        
        <form onSubmit={(e)=> submit(e)} className="center">

            <Row className="col-6" >
                <Form.Label className="col-4">
                User Name
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="text" id="username"  value={data.username} 
                onChange={(e)=>handle(e)} placeholder="Name..." />
                <br />              
                </Col>
            </Row>

            <Row className="col-6" >
                <Form.Label className="col-4">
                Email ID
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="email" model=".email" id="emailid"  value={data.emailid} 
                onChange={(e)=>handle(e)} placeholder="example@gmail.com" />
                <span style={{color: 'red'}}>{emailError}</span><br />
                </Col>
            </Row>

            <Row className="col-6" >
                <Form.Label className="col-4">
                Password
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="password" id="password"  value={data.password}  
                onChange={(e)=>handle(e)}  />
                <br />             
                </Col>
            </Row>


            <Row className="col-6" >
                <Form.Label className="col-4">
                Confirm Password
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="password" id="conpassword"  value={data.conpassword}
                onChange={(e)=>handle(e)} /><br />

                </Col>
            </Row>

            <button className="button">Submit</button>


        </form>
        </div>            
        </div>
    )
}

export default AddUser


