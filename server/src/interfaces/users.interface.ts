export interface User {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
