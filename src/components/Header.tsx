import {useLogout} from "../Hooks/useAuth.ts";
import UserName from "./UserName.tsx";
import { Link } from "react-router-dom";
import type {User} from "../Types/UserType.ts"

interface HederProps {
    currentUser?: User | null;
    isLoading?: boolean;
    inProfile?: boolean;
}

export default function Header({currentUser, isLoading, inProfile}: HederProps) {

    const logout = useLogout()

    const onLogout = async () => {
        if (currentUser) {
            try {
                await logout.mutate()
                window.location.reload()
            } catch (e) {
                console.error(e)
            }
        } else {
            alert("You are not logged in.");
        }
    }

    return (
        <header>
            <div className="Header">
                <ul className="nav">
                    <Link to="/" className="logo">РешиКа</Link>
                    <Link className="nav-item" to="/">Главная</Link>
                    <Link className="nav-item" to="/Profile">Профиль</Link>
                </ul>
                <ul className="user">
                    {isLoading ? (<div className={`loading`}>...</div>
                    ) : currentUser ? (
                        !inProfile ? (
                            <Link to="/Profile" className={"user-profile"}><UserName key={1} nickname={currentUser.nickname}/></Link>
                        ) : <button className={`login-btn`} onClick={onLogout}>Выйти</button>
                    ) : (
                        <Link to="/Login"><button className={`login-btn`}>Войти</button></Link>
                    )
                    }
                </ul>
            </div>
        </header>
    );
}