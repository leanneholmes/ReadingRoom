export interface User {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
