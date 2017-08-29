
import firebase from 'firebase';
import { observable } from 'mobx';
import {fbApp} from '../FirebaseConfig';
import ingredientsStore from './ingredientsStore';

class authstore {
    constructor(fbApp) {
        this.fbApp = fbApp;

        this.auth = observable({
            authUser: null
        });

        this.unwatchAuth = firebase.auth(this.fbApp).onAuthStateChanged(user => {
            this.auth.authUser = user;
            console.log(user);
            if(user!==null){
                ingredientsStore.getData();
            } 
        });
    }
    
    authUser() {
        return this.auth.authUser;
    }
    
    isLoggedIn() {
        return !!this.auth.authUser;
    }

    cleanup() {
        if (this.unwatchAuth) {
            this.unwatchAuth();
        }
    }

    signIn({email, password}) {
        return firebase.auth(this.fbApp).signInWithEmailAndPassword(email, password);
    }

    createUser({email, password}) {
        return firebase.auth(this.fbApp).createUserWithEmailAndPassword(email, password);
    }

    signOut() {
        return firebase.auth(this.fbApp).signOut();
    }
}

const AuthStore = new authstore(fbApp);
export default AuthStore;
