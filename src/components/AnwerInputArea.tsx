import React, { useRef } from 'react';

interface AnswerProps {
    value: string;
    onChange: (content: string) => void;
}

export default function AnswerInputArea({value, onChange}: AnswerProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length < 1500) {
            onChange(event.target.value);
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className={`answer-input`}
            value={value}
            onChange={handleInputChange}
            onInput={adjustHeight}
            style={{
                resize: 'none',
                overflow: 'hidden',
                minHeight: '10px',
                maxHeight: '200px',
                lineHeight: '1em',
            }}
            placeholder="Напишите ваш ответ..."
        />
    );
}