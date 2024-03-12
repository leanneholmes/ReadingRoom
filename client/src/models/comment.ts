export interface ChatComment {
  id: number;
  createdAt: dateFns;
  body: string;
  username: string;
  displayName: string;
  avatar: string;
}
