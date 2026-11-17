
import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'student' | 'club' | 'admin';

interface DemoAccount {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface AuthContextType {
  user: DemoAccount | null;
  signup: (account: DemoAccount) => boolean;
  login: (email: string, password: string, role: Role) => boolean;
  logout: () => void;
}

const adminAccount: DemoAccount = {
  name: 'MIT ADT Admin',
  email: 'admin@mitadt.demo',
  password: 'Admin@12345',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<DemoAccount[]>([adminAccount]);
  const [user, setUser] = useState<DemoAccount | null>(null);

  const signup = (account: DemoAccount) => {
    const email = account.email.trim().toLowerCase();

    if (account.role === 'admin') return false;

    if (accounts.some(a => a.email.toLowerCase() === email)) {
      return false;
    }

    setAccounts(current => [...current, { ...account, email }]);
    return true;
  };

  const login = (email: string, password: string, role: Role) => {
    const account = accounts.find(
      a =>
        a.email.toLowerCase() === email.trim().toLowerCase() &&
        a.password === password &&
        a.role === role
    );

    if (!account) return false;

    setUser(account);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}