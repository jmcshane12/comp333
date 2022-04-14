import React from 'react';
import axios from "axios";
import App from './App';

class Login extends React.Component {
    constructor(props) {
      super(props);
      // The state object is initialized in the constructor of the component.
      this.state = {
        view_login : true,
        view_reg : false,
        view_app : false,
        auth_token : null,
        user : null,
      };
    }

    handleLogin(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        var usr = formData.get("username")
        var pwrd = formData.get("password")
        axios
        .post(`http://localhost:8000/auth/`, {username: usr, password: pwrd})
        .then(res => this.setState({ view_login : false, view_app : true, auth_token : res.data.token, user : usr}))
        .catch(err => console.log(err))
    }

    handleReg(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        var usr = formData.get("reg_username")
        var pwrd = formData.get("reg_password")
        axios
        .post(`http://localhost:8000/api/users/`, {username: usr, password: pwrd})
        .then(res => this.setState({ view_login : true, view_reg : false, auth_token : res.data.token}),
                     alert('Registration Successful. Please sign in to continue.'))
        .catch(err => console.log(err))
    }


    renderLogin(){
        return(
          <>{this.state.view_login && <h1>Sign in to Your Account</h1>}
            {this.state.view_login && <div>
              <form onSubmit={e => this.handleLogin(e)}>
                <input type="text" id="username" name="username" placeholder="Username" required/><br />
                <input type="text" id="password" name="password" placeholder="Password" required/><br />
                <input type="submit" value="Sign in"/>
              </form>
              <h2>New Here?</h2>
              <button onClick={() => this.setState({ view_login : false, view_reg : true})}>Register a New Account</button>
            </div>}
          </>);
    }
    
    renderReg(){
        return(
          <>{this.state.view_reg && <h1>Register a New Account</h1>}
            {this.state.view_reg && <div>
              <form onSubmit={e => this.handleReg(e)}>
                <input type="text" id="reg_username" name="reg_username" placeholder="Username" required/><br />
                <input type="text" id="reg_password" name="reg_password" placeholder="Password" required/><br />
                <input type="submit" value="Register"/>
              </form>
              <button onClick={() => this.setState({ view_login : true, view_reg : false})}>Return to Login</button>
            </div>}
          </>);
    }


    render() {
        return (
            <div>
            
            <div>
            {this.renderLogin()}
            </div>

            <div>
            {this.renderReg()}
            </div>

            
            <div>
            {this.state.view_app &&
                <div>
                <App
                  token = {this.state.auth_token}
                  user = {this.state.user}
                />
                </div>
            }
            </div>
            

            </div>
        );
      }
}

    
export default Login;