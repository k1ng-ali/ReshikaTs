import type {User} from "../Types/UserType.ts"

export default function UserName(props: User) {
    return (
        <div className={`name background-color`}>{props.nickname}</div>
    );
}