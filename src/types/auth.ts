import { Feed } from './feed';
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  avatarUri?: string;
  dateOfBirth?: string;
  Feed?: Feed[];
}
