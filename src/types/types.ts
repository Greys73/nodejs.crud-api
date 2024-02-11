export type TUser = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type TUsers = TUser[];

export type TContent = {
  data?: TUser | TUsers,
  message?: string,
};

export type ControllerResponse = {
  statusCode: number,
  content: TContent,
};
