import { Component } from "react";
import "../Styles/ProfileStyle.css";
import UserInfo from "../components/UserInfo.tsx";
import { UserQuestions, UserAnswers } from "../components/UserContents.tsx";

class Profile extends Component {
    render() {
        return (
            <div className="Profile">
                <UserInfo />
                <UserQuestions />
                <UserAnswers />
            </div>
        );
    }
}

export default Profile;