import type {MessageInstance} from "antd/es/message/interface";
import Button from "./CreatTaskButton.tsx";
import { SearchArea } from "./SearchArea";
import Filter from "./ContentFilter";
import type {User} from "../Types/UserType.ts"
import type {Post} from "../Types/ContentType.ts"

interface CreatTaskProps {
    user: User | null;
    posts: Post[];
    messageApi: MessageInstance;
}

export const ContentActions = ({user, posts, messageApi}: CreatTaskProps) => {
    return (
        <div className={"ContentActions"}>
            <Button messageApi={messageApi} posts={posts} user={user}/>
            <SearchArea />
            <Filter />
        </div>
    )
}