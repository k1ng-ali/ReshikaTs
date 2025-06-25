import { formatDate } from '../utils/formatDate';
import { TbArrowBigUpFilled } from "react-icons/tb";

interface AnswerProps {
    author: string;
    date: string;
    content: string;
    likes_count: number;
    reply_to: string;
    onReplyClick?: (author: string) => void; // Новый пропс для обработки клика
}

export default function Answers({
                                    author,
                                    date,
                                    content,
                                    likes_count,
                                    reply_to,
                                    onReplyClick
                                }: AnswerProps) {
    const handleReplyClick = () => {
        if (onReplyClick) {
            onReplyClick(author);
        }
    };

    return (
        <div className="answers-wrapper">
            <div className="crt_info">
                <p className="author">
                    {author} {reply_to && `• ${reply_to}`}
                </p>
                <p className="date">{formatDate(date)}</p>
            </div>
            <p className="text">{content}</p>
            <div className="answers-footer">
                <div className="reaction-content">
                    <div className="up">
                        <TbArrowBigUpFilled className="up-icon"/>
                    </div>
                    <p className="likes-count">
                        {likes_count > 0 ? "+" : likes_count < 0 ? "-" : ""}{Math.abs(likes_count)}
                    </p>
                </div>
                <div
                    className="to-answer-btn"
                    onClick={handleReplyClick}
                >
                    ответить
                </div>
            </div>
        </div>
    );
}