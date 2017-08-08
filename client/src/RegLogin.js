import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('AuthStore')
@observer
class RegisterOrLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            inProgress: null,
            localError: null
        }
        this.resetState = this.resetState.bind(this);
    }

    resetState(authError) {
        this.setState({
            localError: null,
            inProgress: null,
            password: '',
            authError
        });
    }
    
    register() {
        const {email, password} = this.state;
        if (!email || !password) {
            this.setState({
                localError: 'Enter email and password'
            });
            return;
        }
        const {AuthStore} = this.props;
        this.setState({inProgress: 'Registering...'}, () => {
            AuthStore.createUser({
                email,
                password
            })
              .then(() => this.resetState())
              .catch(error => this.resetState(error));
        });
    }

    login() {
        const {email, password} = this.state;
        if (!email || !password) {
            this.setState({
                localError: 'Enter email and password'
            });
            return;
        }
        const {AuthStore} = this.props;
        this.setState({inProgress: 'Logging In...'}, () => {
            AuthStore.signIn({
                email,
                password
            })
              .then(() => this.resetState())
              .catch(error => this.resetState(error));
        });
    }

    logout() {
        const { AuthStore } = this.props;

        this.setState({inProgress: 'Logging Out...'}, () => {
            AuthStore.signOut()
              .then(() => this.resetState())
              .catch(error => this.resetState(error));
        });
    }

    renderLoginForm() {
        const {email, password} = this.state;
        return (
          <div>
                <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input value={email} className="form-control"  onChange={e=>this.setState({email: e.target.value})} placeholder='email'  id="email"/>
                </div>
                <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                 <input value={password} className="form-control"  onChange={e=>this.setState({password: e.target.value})} placeholder='password' type='password' id="pwd"/>
                </div>
                <button onClick={() => this.login()} className="btn btn-default">Login</button>
              <button onClick={() => this.register()} className="btn btn-default">Register</button>
          </div>
        );
    }
    renderLogoutButton() {
        return (
            <div>
                <button onClick={() => this.logout()} className="btn btn-default">Log Out</button>
            </div>
        );
    }

    render() {
        const {localError, inProgress, authError} = this.props;
        const {AuthStore} = this.props;
        const authUser = AuthStore.authUser();
        return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                {inProgress && <div>{inProgress}</div> }
                {localError && <div style={{backgroundColor:'red'}}>{localError}</div> }
                {authError && <div style={{backgroundColor:'red'}}>API Error: {JSON.stringify(authError)}</div> }
                {authUser && <div>Signed in as {authUser.email}</div> }
                {!authUser && this.renderLoginForm() }
                {authUser && this.renderLogoutButton()}
            </div>
        );
    }
}

export default observer(RegisterOrLogin);