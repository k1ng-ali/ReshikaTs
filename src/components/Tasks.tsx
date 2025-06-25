import { useState } from "react";
import Answers from "./Answers";
import { formatDate } from "../utils/formatDate";
import InputArea from "./AnwerInputArea.tsx";
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb";
import type {Post, Answer, newAnswer} from "../Types/ContentType.ts";
import type {User} from "../Types/UserType.ts";
import {useCreateAnswer} from "../Hooks/useAuth.ts";


interface TaskProps {
    post: Post;
    currentUser: User | null;
}

const Tasks: React.FC<TaskProps> = ({ post, currentUser }) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(post.isLiked || false);
    const [replyTo, setReplyTo] = useState("");
    const [ansContent, setAnsContent] = useState("");
    const [isHiding, setIsHiding] = useState(false);

    const creatAnswer = useCreateAnswer()

    const loadMore = () => {
        setVisible(!visible);
        setReplyTo(post.author);
        setVisibleCount((prevCount) =>
            Math.min(prevCount + 3, post.answers.length)
        );
    };

    const hideAnswers = () => {
        setIsHiding(true); // Запускаем анимацию скрытия
        setTimeout(() => {
            setVisible(false);
            setReplyTo("");
            setVisibleCount(0);
            setIsHiding(false); // Завершаем анимацию
        }, 700); // Должно совпадать с duration в CSS
    };


    const handleSetReplyTo = (nickname: string) => {
        setReplyTo(nickname);
    };


    const sendAnswer = async () => {
        if (replyTo !== "" && ansContent && currentUser && ansContent.length > 30) {
            const newAnswerData: newAnswer = {
                content: ansContent,
                reply_to: replyTo,
                post_id: post.id,
            };
            try {
                const newAns: Answer = await creatAnswer.mutateAsync(newAnswerData);
                post.answers.unshift(newAns)
                console.log(newAnswerData);
                // Здесь можно добавить отправку на сервер
                console.log(currentUser);
                setAnsContent("");
                setVisibleCount(prev => prev + 1);
            } catch (error) {
                alert(`Ошибка со стороны сервера, ${error}`);
            }
        }
    };


    const handleLikeClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);

    };

    const { title, author, date, content, likes_count, answers } = post;

    return (
        <div className="task" id="tasks" onClick={!visible ? loadMore : undefined}>
            <h3>{title}</h3>
            <div className="crt_info">
                <div>
                    <p className="author">{author}</p>
                    <p className="date">{formatDate(date)}</p>
                </div>
                <button className={`subscribe`}>подписаться</button>
            </div>
            <p className="text">{content}</p>
            <div className="active-info">
                <div className={`reaction-content`}>
                    <div className={`up`} onClick={handleLikeClick}>
                        <TbArrowBigUpFilled className={`up-icon ${isLiked ? 'liked' : ''}`} />
                        <p className={`interesting ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>Интересно •</p>
                        <span className="trail" />
                    </div>
                    <p className="likes-count">
                        {likes_count > 0 ? `+ ${likes_count}` : (likes_count < 0 ? `- ${likes_count}` : `${likes_count}`)}
                    </p>
                    <TbArrowBigDownFilled style={{ fill: "white" }} />
                </div>
                {visible ? (
                    <div className="to-answer-btn" onClick={ () =>handleSetReplyTo(post.author)}>
                        ответить
                    </div>
                ):(
                    <p className="answers-count">{answers.length} ответов</p>
                    )
                }
            </div>
            <div className={`answers ${visible ? (isHiding ? "closing" : "open") : "close"}`}>
                {answers.slice(0, visibleCount).map((answer: Answer) => (
                    <Answers
                        key={answer.id}
                        author={answer.author}
                        date={answer.date}
                        content={answer.content}
                        likes_count={answer.likes_count}
                        reply_to={answer.reply_to}
                        onReplyClick={handleSetReplyTo} // Передаем функцию обработки
                    />
                ))}
                {visibleCount == 0 && visible &&(
                    <div className={`hasnt-answers`}>Пока ответов нет...</div>
                )}
            </div>
            <div className={`task-btn`}>
                {visibleCount < answers.length && visibleCount > 0 && (
                    <div className={`show-more ${visibleCount > 0 ? "show-more-active" : ""}`} onClick={loadMore}>
                        показать еще...
                    </div>
                )}
                {visible && (
                    <div className={`hide-answers ${visibleCount < answers.length ? "hide-answers-active" : ""}`} onClick={hideAnswers}>
                        скрыть
                    </div>
                )}
            </div>
            <div className={`answer-input-area ${visible ? (isHiding ? "closing" : "open"): "close"}`}>
                <InputArea
                    value={ansContent}
                    onChange={(content) => setAnsContent(content)}
                />
                <div className={`answer-btn-cnt`}>
                    <p className={`ans-len ${
                        ansContent.length<30 || ansContent.length>1499 ? "err" : ""
                    }`}>{ansContent.length}/{1500}</p>
                    <p className="author answer-to">{replyTo}</p>
                    <button
                        className={`send-answer-button ${!currentUser || !ansContent.trim() || ansContent.length < 30 ? "unactive" : ""}`}
                        onClick={sendAnswer}
                        disabled={!ansContent.trim() || (ansContent.length < 30 ? true : false) || !currentUser}>
                        ответить
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Tasks;
