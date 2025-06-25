import { Component } from 'react';
import "../Styles/LoginStyle.css";
import Authentification from "../components/Authentification.tsx";
import Description from "../components/Description.tsx";

class Login extends Component {
    render() {
        return (
            <div className={"Login"}>
                <Authentification/>
                <Description />
            </div>
        );
    }
}

export default Login;