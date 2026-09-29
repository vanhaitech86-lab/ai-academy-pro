'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: 'student' | 'admin';
  password?: string;
  joinedDate?: string;
  ordersCount?: number;
  totalSpent?: number;
  status?: 'active' | 'locked';
}

interface AuthResponse {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<AuthResponse>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<AuthResponse>;
  resetPassword: (identifier: string, newPass: string) => Promise<AuthResponse>;
  updateAdminPassword: (newPass: string) => boolean;
  getAllCustomers: () => AuthUser[];
  resetCustomerPassword: (userId: string, newPass: string) => boolean;
  updateCustomer: (updatedUser: AuthUser) => boolean;
  toggleCustomerStatus: (userId: string) => boolean;
  deleteCustomer: (userId: string) => boolean;
  logout: () => void;
}

const DEFAULT_USERS_DB: AuthUser[] = [
  {
    id: 'usr_admin_vanhai',
    name: 'Quản Trị Viên (Văn Hải)',
    email: 'vanhaitech.86@gmail.com',
    phone: '0978076936',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    password: '12345678',
    joinedDate: '2025-01-01',
    ordersCount: 0,
    totalSpent: 0,
    status: 'active'
  },
  {
    id: 'usr_cust_1',
    name: 'Trần Minh Quang',
    email: 'quang.tran@gmail.com',
    phone: '0988123456',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    password: '12345678',
    joinedDate: '2025-02-15',
    ordersCount: 3,
    totalSpent: 1890000,
    status: 'active'
  },
  {
    id: 'usr_cust_2',
    name: 'Nguyễn Thị Hoa',
    email: 'hoa.nguyen@yahoo.com',
    phone: '0912345678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    password: '12345678',
    joinedDate: '2025-02-20',
    ordersCount: 1,
    totalSpent: 686000,
    status: 'active'
  },
  {
    id: 'usr_cust_3',
    name: 'Phạm Đức Duy',
    email: 'duy.pham@gmail.com',
    phone: '0934567890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    password: '12345678',
    joinedDate: '2025-03-01',
    ordersCount: 2,
    totalSpent: 1290000,
    status: 'active'
  },
  {
    id: 'usr_cust_4',
    name: 'Lê Thu Trang',
    email: 'trang.le@outlook.com',
    phone: '0945678901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    password: '12345678',
    joinedDate: '2025-03-10',
    ordersCount: 1,
    totalSpent: 68000,
    status: 'active'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usersDb, setUsersDb] = useState<AuthUser[]>(DEFAULT_USERS_DB);

  // Load from local storage
  useEffect(() => {
    try {
      // Load users database
      const savedDb = localStorage.getItem('ai_academy_users_db');
      if (savedDb) {
        const parsedDb: AuthUser[] = JSON.parse(savedDb);
        // Ensure admin account vanhaitech.86@gmail.com is always present
        const hasAdmin = parsedDb.some((u) => u.email.toLowerCase() === 'vanhaitech.86@gmail.com');
        if (!hasAdmin) {
          parsedDb.unshift(DEFAULT_USERS_DB[0]);
          localStorage.setItem('ai_academy_users_db', JSON.stringify(parsedDb));
        }
        setUsersDb(parsedDb);
      } else {
        localStorage.setItem('ai_academy_users_db', JSON.stringify(DEFAULT_USERS_DB));
        setUsersDb(DEFAULT_USERS_DB);
      }

      // Load current logged in user
      const savedUser = localStorage.getItem('ai_academy_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveDb = (newDb: AuthUser[]) => {
    setUsersDb(newDb);
    try {
      localStorage.setItem('ai_academy_users_db', JSON.stringify(newDb));
    } catch (e) {
      console.error('Failed to save users database', e);
    }
  };

  // Login with Email OR Phone Number
  const login = async (identifier: string, pass: string): Promise<AuthResponse> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check in database by email OR phone
    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) {
        currentDb = JSON.parse(localDb);
      }
    } catch {
      // fallback
    }

    const matchedUser = currentDb.find(
      (u) => u.email.toLowerCase() === cleanId || (u.phone && u.phone.trim() === cleanId)
    );

    if (matchedUser) {
      if (matchedUser.status === 'locked') {
        return { success: false, message: 'Tài khoản này hiện đang tạm khóa. Vui lòng liên hệ hỗ trợ Zalo.' };
      }

      // Check password
      if (matchedUser.password && matchedUser.password !== cleanPass) {
        return { success: false, message: 'Mật khẩu không chính xác. Bạn có thể bấm Quên mật khẩu để đặt lại.' };
      }

      // Login success
      setUser(matchedUser);
      localStorage.setItem('ai_academy_user', JSON.stringify(matchedUser));
      return { success: true };
    }

    // Special fallback for admin vanhaitech.86@gmail.com
    if (cleanId === 'vanhaitech.86@gmail.com') {
      const adminUser: AuthUser = {
        id: 'usr_admin_vanhai',
        name: 'Văn Hải (Admin)',
        email: 'vanhaitech.86@gmail.com',
        phone: '0978076936',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'admin',
        password: cleanPass || '12345678',
        joinedDate: '2025-01-01',
        status: 'active'
      };
      const updated = [adminUser, ...currentDb.filter((u) => u.email.toLowerCase() !== 'vanhaitech.86@gmail.com')];
      saveDb(updated);
      setUser(adminUser);
      localStorage.setItem('ai_academy_user', JSON.stringify(adminUser));
      return { success: true };
    }

    // If identifier is not found
    return {
      success: false,
      message: 'Không tìm thấy tài khoản với Email hoặc Số điện thoại này. Vui lòng kiểm tra lại hoặc Đăng ký mới.'
    };
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const loggedUser: AuthUser = {
      id: 'usr_gg_' + Date.now(),
      name: 'Học Viên AI Pro',
      email: 'hocvien.ai@gmail.com',
      phone: '0988888999',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'student',
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(loggedUser);
    localStorage.setItem('ai_academy_user', JSON.stringify(loggedUser));
    return true;
  };

  // Register with Name, Email, Phone, Password
  const register = async (name: string, email: string, phone: string, pass: string): Promise<AuthResponse> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const emailExists = currentDb.some((u) => u.email.toLowerCase() === cleanEmail);
    if (emailExists) {
      return { success: false, message: 'Email này đã được sử dụng trên hệ thống. Vui lòng đăng nhập hoặc dùng email khác.' };
    }

    if (cleanPhone) {
      const phoneExists = currentDb.some((u) => u.phone && u.phone.trim() === cleanPhone);
      if (phoneExists) {
        return { success: false, message: 'Số điện thoại này đã được sử dụng. Vui lòng đăng nhập hoặc dùng số khác.' };
      }
    }

    const newUser: AuthUser = {
      id: 'usr_' + Date.now(),
      name: name.trim() || 'Học Viên Mới',
      email: cleanEmail,
      phone: cleanPhone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: cleanEmail === 'vanhaitech.86@gmail.com' ? 'admin' : 'student',
      password: pass,
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0,
      status: 'active'
    };

    const newDb = [newUser, ...currentDb];
    saveDb(newDb);
    setUser(newUser);
    localStorage.setItem('ai_academy_user', JSON.stringify(newUser));
    return { success: true };
  };

  // Reset password via Email OR Phone
  const resetPassword = async (identifier: string, newPass: string): Promise<AuthResponse> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = newPass.trim();

    if (cleanPass.length < 6) {
      return { success: false, message: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' };
    }

    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const index = currentDb.findIndex(
      (u) => u.email.toLowerCase() === cleanId || (u.phone && u.phone.trim() === cleanId)
    );

    if (index === -1) {
      // If it's admin email vanhaitech.86@gmail.com not yet saved
      if (cleanId === 'vanhaitech.86@gmail.com') {
        const adminUser: AuthUser = {
          id: 'usr_admin_vanhai',
          name: 'Văn Hải (Admin)',
          email: 'vanhaitech.86@gmail.com',
          phone: '0978076936',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          role: 'admin',
          password: cleanPass,
          joinedDate: '2025-01-01',
          status: 'active'
        };
        const updated = [adminUser, ...currentDb];
        saveDb(updated);
        return { success: true, message: 'Đặt lại mật khẩu Admin thành công!' };
      }
      return { success: false, message: 'Không tìm thấy tài khoản với Email hoặc Số điện thoại này.' };
    }

    currentDb[index].password = cleanPass;
    saveDb([...currentDb]);

    // If current logged in user is this person, update state
    if (user && (user.email.toLowerCase() === cleanId || (user.phone && user.phone.trim() === cleanId))) {
      const updatedUser = { ...user, password: cleanPass };
      setUser(updatedUser);
      localStorage.setItem('ai_academy_user', JSON.stringify(updatedUser));
    }

    return { success: true, message: 'Đặt lại mật khẩu thành công! Bạn có thể dùng mật khẩu mới để đăng nhập ngay.' };
  };

  // Update admin password directly
  const updateAdminPassword = (newPass: string): boolean => {
    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const adminIndex = currentDb.findIndex((u) => u.email.toLowerCase() === 'vanhaitech.86@gmail.com');
    if (adminIndex !== -1) {
      currentDb[adminIndex].password = newPass;
      saveDb([...currentDb]);
      if (user && user.email.toLowerCase() === 'vanhaitech.86@gmail.com') {
        const u = { ...user, password: newPass };
        setUser(u);
        localStorage.setItem('ai_academy_user', JSON.stringify(u));
      }
      return true;
    }
    return false;
  };

  // Customer Management APIs for Admin
  const getAllCustomers = (): AuthUser[] => {
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) return JSON.parse(localDb);
    } catch {}
    return usersDb;
  };

  const resetCustomerPassword = (userId: string, newPass: string): boolean => {
    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const idx = currentDb.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      currentDb[idx].password = newPass;
      saveDb([...currentDb]);
      return true;
    }
    return false;
  };

  const updateCustomer = (updatedUser: AuthUser): boolean => {
    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const idx = currentDb.findIndex((u) => u.id === updatedUser.id);
    if (idx !== -1) {
      currentDb[idx] = updatedUser;
      saveDb([...currentDb]);
      return true;
    }
    return false;
  };

  const toggleCustomerStatus = (userId: string): boolean => {
    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const idx = currentDb.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      currentDb[idx].status = currentDb[idx].status === 'locked' ? 'active' : 'locked';
      saveDb([...currentDb]);
      return true;
    }
    return false;
  };

  const deleteCustomer = (userId: string): boolean => {
    let currentDb = usersDb;
    try {
      const localDb = localStorage.getItem('ai_academy_users_db');
      if (localDb) currentDb = JSON.parse(localDb);
    } catch {}

    const newDb = currentDb.filter((u) => u.id !== userId);
    saveDb(newDb);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai_academy_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        resetPassword,
        updateAdminPassword,
        getAllCustomers,
        resetCustomerPassword,
        updateCustomer,
        toggleCustomerStatus,
        deleteCustomer,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
