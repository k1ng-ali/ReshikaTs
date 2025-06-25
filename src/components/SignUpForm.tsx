import React, { useState } from 'react';
import type {RegisterData} from "../Types/UserType.ts";

interface SignUpFormProps {
    onSubmit: (formData: RegisterData) => void;
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
    const [formData, setFormData] = useState({
        nickname: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const [fieldValidity, setFieldValidity] = useState<Record<string, boolean | null>>({
        nickname: null,
        password: null,
        repeatPassword: null,
        firstName: null,
        lastName: null,
        email: null,
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            const isValid = validateEmail(value);
            setFieldValidity(prev => ({ ...prev, [name]: isValid }));
            setFormData(prev => ({ ...prev, [name]: value }));
            return;
        }

        const regex = /^[a-zA-Z0-9-]+$/;
        let isValid = true;

        if (name === "nickname" || name === "password" || name === "repeatPassword") {
            isValid = regex.test(value);
        }

        if ((name === "nickname" || name === "password") && value) {
            isValid = isValid && (value.length >= 6 && value.length <= 15);
        }

        setFieldValidity(prev => ({
            ...prev,
            [name]: value === "" ? null : isValid
        }));
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateStep1 = () => {
        const regex = /^[a-zA-Z0-9-]+$/;

        if (formData.nickname === "" || formData.password === "" || formData.repeatPassword === "") {
            setError("Заполните все поля!");
            return false;
        }

        if (!regex.test(formData.nickname) || !regex.test(formData.password)) {
            setError("Никнейм и пароль могут содержать только латинские буквы, цифры и дефис.");
            return false;
        }

        if (formData.password !== formData.repeatPassword) {
            setError("Пароли не совпадают.");
            return false;
        }

        setError("");
        return true;
    };

    const nextStep = () => {
        if (currentStep === 1 && !validateStep1()) return;
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getInputClass = (fieldName: string) => {
        const isValid = fieldValidity[fieldName];
        if (isValid === null) return "fieldset";
        return isValid ? "fieldset valid" : "fieldset invalid";
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            {currentStep === 1 ? (
                <>
                    <h1 className="form-title">Присоединяйтесь к нам</h1>

                    <h3 className="fieldset-title">ник</h3>
                    <label className="label">
                        <input
                            type="text"
                            name="nickname"
                            placeholder="введите ваш ник"
                            value={formData.nickname}
                            onChange={handleChange}
                            className={getInputClass("nickname")}
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
                            className={getInputClass("password")}
                            required
                        />
                    </label>

                    <h3 className="fieldset-title">подтвердить пароль</h3>
                    <label className="label">
                        <input
                            type="password"
                            name="repeatPassword"
                            placeholder="повторите пароль"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            className={getInputClass("repeatPassword")}
                            required
                        />
                    </label>

                    {error && <p className="fieldset-title error-title">{error}</p>}

                    <button
                        type="button"
                        className="form-login-button"
                        onClick={nextStep}
                    >
                        Далее
                    </button>
                </>
            ) : (
                <>
                    <h1 className="form-title">Дополнительная информация</h1>

                    <h3 className="fieldset-title">Имя</h3>
                    <label className="label">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="введите ваше имя"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={getInputClass("firstName")}
                        />
                    </label>

                    <h3 className="fieldset-title">Фамилия</h3>
                    <label className="label">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="введите вашу фамилию"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={getInputClass("lastName")}
                        />
                    </label>

                    <h3 className="fieldset-title">Email</h3>
                    <label className="label">
                        <input
                            type="email"
                            name="email"
                            placeholder="введите ваш email"
                            value={formData.email}
                            onChange={handleChange}
                            className={getInputClass("email")}
                        />
                    </label>
                    <button
                        type="submit"
                        className="form-login-button"
                    >
                        Зарегистрироваться
                    </button>
                    <button
                        type="button"
                        className="form-login-button back-btn"
                        onClick={prevStep}
                    >
                        Назад
                    </button>
                </>
            )}
        </form>
    );
}