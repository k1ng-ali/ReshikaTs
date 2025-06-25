import { TbArrowBigUpFilled } from "react-icons/tb";
import { FaUserPlus, FaUserCheck, FaRegCalendarCheck } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";

export default function UserInfo() {
    return (
        <div className="User-info-container block">
            <div className="name-сcontainer">
                <div className="user-info">
                    <div className="FirstName name">FirstName</div>
                    <div className="LastName name">LastName</div>
                </div>
                <div className="username">username</div>
            </div>
            <div className="follow-info">
                <div className="followers info-secondary"><FaUserCheck className="icon"/> Подписчики ● 9800</div>
                <div className="following info-secondary"><FaUserPlus className="icon"/> Подписки ● 100</div>
                <div className={"likes info-secondary"}><TbArrowBigUpFilled className="icon"/> Интересный контент ● 43k</div>
            </div>
            <div className="bio info-primary"><BsInfoSquareFill className="icon description-icon"/> bio</div>
            <div className="description"> Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. A atque doloremque enim error id perferendis repellat reprehenderit similique veniam, vero.
            </div>
            <div className="join-info info-secondary"> <FaRegCalendarCheck className="icon"/> joined April 2025</div>
        </div>
    );
}