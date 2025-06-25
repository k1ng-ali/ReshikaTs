import React, { useState } from 'react';
import type {LoginData} from '../Types/UserType.ts';

interface LoginFormProps {
    onSubmit: (formData: LoginData) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const [formData, setFormData] = useState({
        nickname: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const regex = /^[a-zA-Z0-9-]+$/;
        if (!regex.test(formData.nickname) || !regex.test(formData.password)) {
            setError("Никнейм и пароль могут содержать только латинские буквы, цифры и дефис.");
            return;
        }

        setError("");
        onSubmit(formData);
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <h1 className="form-title">Добро пожаловать</h1>

            <h3 className="fieldset-title">ник</h3>
            <label className="label">
                <input
                    type="text"
                    name="nickname"
                    placeholder="введите ваш ник"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="fieldset user-name"
                    required
                />
            </label>

            <h3 className="fieldset-title">пароль</h3>
            <label className="label">
                <input
                    type="password"
                    name="password"
                    placeholder="введите пароль"
                    value={formData.password}
                    onChange={handleChange}
                    className="fieldset password"
                    required
                />
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="form-login-button">Войти</button>
            <button type="button" className="form-login-button tg-login-btn">
                Войти через Telegram
            </button>
        </form>
    );
}