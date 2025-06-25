export interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
    likes_count: number;
    isLiked?: boolean;
    answers: Answer[];
}

export interface Answer {
    id: string;
    author: string;
    reply_to: string;
    date: string;
    content: string;
    likes_count: number;
    isLiked?: boolean;
}

export interface newPost {
    title?: string;
    content: string;
}

export interface newAnswer extends newPost {
    "post_id": number;
    "reply_to"?: string;
}
