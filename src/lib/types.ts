import { User } from '@/lib/api/client';
import { AuthUser } from '@/lib/auth/auth';

export type AppUser = AuthUser & User;
