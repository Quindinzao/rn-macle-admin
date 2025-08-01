import { ReactNode } from 'react';

export interface AuthDataProps {
  token: string;
  exp: number;
  userId: number;
}

export interface AuthContextDataProps {
  authData?: AuthDataProps;
  handleSignIn: (username: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
  isLoading: boolean;
}

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface RegisterPayloadProps {
  username: string;
  password: string;
}
