import { useState } from "react";
import type {LoginData, RegisterData} from "../Types/UserType.ts";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import {useLogin, useRegister} from "../Hooks/useAuth.ts"

export default function Authentification() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const login = useLogin();
    const register = useRegister();

    const onLogin = (formData: LoginData) => {
        login.mutate(formData,{
            onSuccess: () => {
                window.location.replace("/");
            },
            onError: () => {
                alert("Ошибка входа, перезагрузите страницу");
            }
        })
    }

    const onRegister = (formData: RegisterData) => {
        register.mutate(formData,{
            onSuccess: () => {
                window.location.replace("/");
            },
            onError: () => {
                alert("Ошибка регистрации, повторите процесс...")
            }
        })
    }

    return (
        <div className="authentication-container">
            <div className="login-button-container">
                <button
                    className={`btn login-btn ${activeTab === "login" ? "active-btn" : ""}`}
                    onClick={() => setActiveTab("login")}
                >
                    Вход
                </button>
                <button
                    className={`btn register-btn ${activeTab === "register" ? "active-btn" : ""}`}
                    onClick={() => setActiveTab("register")}
                >
                    Регистрация
                </button>
            </div>

            {activeTab === "login"
                ? <LoginForm onSubmit={onLogin} />
                : <SignupForm onSubmit={onRegister} />
            }
        </div>
    );
}