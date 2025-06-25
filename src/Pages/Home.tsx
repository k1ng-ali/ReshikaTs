import Content from "../components/Content.tsx";
import type {User} from "../Types/UserType.ts"
import type {Post} from "../Types/ContentType.ts"

interface HomeProps {
    currentUser: User | null;
    posts: Post[];
    isLoading: boolean;
}

export default function Home ({currentUser, posts, isLoading}: HomeProps) {
    return (
        <div className={"Home"}>
            {!isLoading ? (
                console.log(posts),
            <Content
                posts={posts}
                currentUser={currentUser}/>
                ):(<div>loading...</div>)
            }
        </div>
    );
}