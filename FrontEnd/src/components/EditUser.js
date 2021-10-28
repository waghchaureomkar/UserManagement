import React,{useState,useEffect} from 'react'
import {Row,Form,Col} from 'react-bootstrap'
import axios from 'axios'
import { useHistory,useParams } from 'react-router';

// const required = (val) => val && val.length; //value > 0
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function EditUser() {

    const url = "http://localhost:5000/user";
    const history = useHistory();
    const { id } = useParams();
    const [data,setData] = useState({
        username:"",
        emailid: "",
        password: ""
    });

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async() => {
        const response = await axios.get(`${url}/${id}`)
        const{username,emailid} = response.data ;
        setData({username,emailid});
    }

   async function submit(e){

        const pw1 = data.password;
        const pw2 = data.conpassword;

        if(pw1==pw2){
            e.preventDefault();
            console.log(data);
            axios.put(`${url}/${id}`,{
                username:data.username,
                password:data.password
            })
            .then(res => {
                if(res.data.edited){
                    alert(res.data.edited)
                    history.push('/usermanagement');
                }else{
                    alert(res.data.msg)
                }
            })  
        } else {
            alert("password not match")
        }
        
       
    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }



    return (
        <div>
            <div>
            <a href="/usermanagement">
            <button className="button" >Back</button>
            </a>
            <h3>Edit User</h3><br />
            </div>
            <div>        
        <form onSubmit={(e)=> submit(e)} className="center">

            <Row className="col-6" >
                <Form.Label className="col-4">
                User Name
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="text" id="username"  value={data.username} 
                onChange={(e)=>handle(e)} /><br />               
                </Col>
            </Row>

            <Row className="col-6" >
                <Form.Label className="col-4">
                Email id
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="email" id="emailid"  value={data.emailid} 
                onChange={(e)=>handle(e)} disabled /><br />               
                </Col>
            </Row>

            <Row className="col-6" >
                <Form.Label className="col-4">
                Password
                </Form.Label>
                <Col className="col-8">
                <Form.Control type="password" id="password"  value={data.password} 
                onChange={(e)=>handle(e)}  /><br />               
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

export default EditUser

