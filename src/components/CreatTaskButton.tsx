import type {MessageInstance} from "antd/es/message/interface";
import React from "react";
import type {User} from "../Types/UserType.ts"
import CreatePost from "./CreatePost.tsx"
import type {Post} from "../Types/ContentType.ts"

interface IProps {
    user: User | null;
    posts: Post[];
    messageApi: MessageInstance;
}

export default function CreatTaskButton({user, posts, messageApi}: IProps) {
    const [showCreatePostFrom , setShowCreatePostFrom] = React.useState<boolean>(false)
    return (
        <div className={"creat-task-button"}>
            <button className={`primary-btn ${!user ? "disabled" : ""}`}
            disabled={!user ? true : false}
            onClick={() => setShowCreatePostFrom(true)}>
                Добавить вопрос
            </button>
            {showCreatePostFrom && (
                <CreatePost messageApi={messageApi} posts={posts} user={user} setShowCreatePostFrom={setShowCreatePostFrom} />
            )}
        </div>
    );
}