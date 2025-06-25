import React, { useState } from 'react';

export default function FirstForm() {
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "nickname") setNickname(value);
        else if (name === "password") setPassword(value);
        else if (name === "repeat-password") setRepeatPassword(value);
    };

    return (
        <div>
            <h1 className="form-title">Присоединяйтесь к нам</h1>

            <h3 className="fieldset-title">ник</h3>
            <label className="label">
                <input
                    type="text"
                    name="nickname"
                    placeholder="введите ваш ник"
                    value={nickname}
                    onChange={handleChange}
                    title="Разрешены только латинские буквы, цифры и дефис"
                    className="fieldset user-name"
                    required
                />
            </label>

            <h3 className="fieldset-title">пароль</h3>
            <label className="label">
                <input
                    type="password"
                    name="password"
                    placeholder="введите паш пароль"
                    value={password}
                    onChange={handleChange}
                    title="Разрешены только латинские буквы, цифры и дефис"
                    className="fieldset password"
                    required
                />
            </label>

            <h3 className="fieldset-title" id="repeat-pass-title">
                подтвердить пароль
            </h3>
            <label className="label">
                <input
                    type="password"
                    name="repeat-password"
                    placeholder="повторите пароль"
                    className="fieldset repeat-password"
                    value={repeatPassword}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}