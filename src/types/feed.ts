import { Comment } from "./comment";

export interface Feed {
    id?: string;
    title?: string;
    subTitle?: string;
    imgUri?: string;
    avatarUri?: string;
    postDate?: string;
    content?: string;
    userId?: string;
    comments?: Comment[];
  }