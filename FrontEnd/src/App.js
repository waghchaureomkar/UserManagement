import './App.css';
import Login from './components/Login';
import Header from './components/Header';
// import Footer from './components/Footer';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import UserManagement from "./components/UserManagement"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/userManagement" component={UserManagement} />
            <Route path="/adduser" component={AddUser}/>
            <Route path="/edituser/:id" component={EditUser}/>
            <Route path="/viewuser/:id" component={ViewUser}/>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
