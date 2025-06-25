import type {MessageInstance} from "antd/es/message/interface";
import { ContentActions } from "./ContentActions";
import "../Styles/FooterStyle.css";
import type {User} from  "../Types/UserType.ts"
import type {Post} from "../Types/ContentType.ts"

interface FooterProps {
    currentUser: User | null;
    posts: Post[];
    messageApi: MessageInstance;
}

export default function Footer({currentUser, posts, messageApi}: FooterProps) {
    return (
        <div className={"Footer"}>
            <ContentActions messageApi={messageApi} posts={posts} user={currentUser}/>
        </div>
    );
}