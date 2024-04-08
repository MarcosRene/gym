import { createContext, useState } from 'react';

import { UserDTO } from '@/dtos/UserDTO';

export type AuthContextDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({
    id: '1',
    name: 'Marcos Renê',
    email: 'marcosrenedev@gmal.com',
    avatar: 'marcos.png',
  } as UserDTO);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
