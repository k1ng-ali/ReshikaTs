import "../Styles/CreatePostStyle.css"
import type {MessageInstance} from "antd/es/message/interface";
import {useState} from "react";
import type {User} from "../Types/UserType.ts"
import {Flex, Input, Button} from 'antd';
import {useCreatePosts} from "../Hooks/useAuth.ts"
import type {newPost, Post} from "../Types/ContentType.ts";

interface IProps {
    user: User | null;
    setShowCreatePostFrom: (showCreatePostFrom: boolean) => void;
    posts: Post[];
    messageApi: MessageInstance;
}

export default function CreatePost({ user, setShowCreatePostFrom, posts, messageApi}: IProps) {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const { TextArea } = Input
    const createPost = useCreatePosts()

    const handleHideForm = () => {
        setShowCreatePostFrom(false);
    }

    const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const disable:boolean = !user || !posts?.length || (title.length < 15 || description.length <50 ) ? true : false

    const send = async () => {
        if (title.length > 150 || description.length > 2500 || !user) {
            return null;
        }

        if (title.length > 15 && description.length > 50 && user) {
            const newPost: newPost = {
                content: description,
                title: title,
            };

            // Показываем сообщение загрузки
            const key = 'creatingPost'; // уникальный ключ, чтобы обновить/удалить это сообщение позже
            messageApi.open({
                key,
                type: 'loading',
                content: 'Публикация поста...',
                duration: 0, // 0 — чтобы не исчезло автоматически
            });

            try {
                const post: Post = await createPost.mutateAsync(newPost);
                posts.unshift(post);
                setTitle("");
                setDescription("");

                // Обновляем уведомление
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Пост опубликован!',
                    duration: 5,
                });
                handleHideForm()
            } catch (error) {
                console.error(error);

                // Обновляем уведомление на ошибку
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Ошибка при публикации!',
                    duration: 5,
                });
                handleHideForm()
            }
        }
    };



    return (
        <div className={`post`}>
            <div className={`post-wrapper`}>
                <Flex vertical gap={15} className={`flex`}>
                    <div className={`title-container`}>
                        <h2 className={`title`}>
                            Заголовок
                        </h2>
                        <Button
                            danger
                            color="primary"
                            type="dashed"
                            style={{
                                fontWeight: "bold",
                            }}
                            onClick={() => handleHideForm()}
                        ><p className={`btn-text`}>X</p></Button>
                    </div>
                    <TextArea
                        showCount
                        maxLength={150}
                        onChange={onChangeTitle}
                        count={{
                            max: 150,
                        }}
                        placeholder={"Введите больше 15 символов"}
                        style={{
                            height: 50,
                            width: `100%`,
                            resize: `none`,
                            fontSize: 15,
                        }}/>
                    <h3 className={`title`}>
                        Вопрос
                    </h3>
                    <TextArea
                        showCount
                        maxLength={150}
                        onChange={onChangeDescription}
                        count={{
                            max: 300,
                        }}
                        placeholder={"Введите больше 50 символов"}
                        style={{
                            height: 300,
                            width: `100%`,
                            resize: `none`,
                        }}/>
                    <button className={`creat-btn ${disable ? "disable" : ""}`}
                        onClick={send}
                        disabled={disable}
                    >Опубликовать</button>
                </Flex>

            </div>
        </div>
    )
}