import { UserRole } from './user.role.enum';

export interface JwtPayload {
  username: string;
  role: UserRole;
}
