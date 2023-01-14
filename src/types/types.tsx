export interface IUser {
  _id: string,
  name: string,
  username: string,
  password?: string,
  token?: string,
}

export interface IPost {
  _id: string,
  title: string,
  content?: string,
  postedAt: string,
  postedBy: IUser,
  tags: string[],
}