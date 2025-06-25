import Tasks from "./Tasks";
import "../Styles/ContentStyle.css";
import type { Post } from "../Types/ContentType.ts";
import type {User} from "../Types/UserType.ts"

interface ContentProps {
    posts: Post[]; // Явно указываем, что компонент принимает пропс posts
    currentUser: User | null;
}


export default function Content ({posts, currentUser}: ContentProps) {
    if (!posts || posts.length === 0) {
        return <p>Loading</p>;
    }

    return (
        <div className="content">
            {posts.map(post => (
                <Tasks
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );

}