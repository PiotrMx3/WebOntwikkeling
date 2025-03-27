export interface Post {
    name: string;
    username: string;
    text: string;
    createdOn: Date;
}

export interface Profile {
    username: string;
    name: string;
    bio: string;
}

export interface Trends {
     category: string;
     hashtag: string;
     posts: number;
}