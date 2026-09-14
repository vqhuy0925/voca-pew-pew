import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebaseConfig';

export interface AdminUserState {
  user: User | null;
  isAuthenticated: boolean;
  email: string | null;
  loading: boolean;
}

/**
 * Sign in as Admin using Email and Password
 */
export const adminSignIn = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase chưa được cấu hình khóa API trong môi trường.' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
    return { success: true };
  } catch (error: any) {
    let message = 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      message = 'Email hoặc mật khẩu không chính xác.';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Đã thử quá nhiều lần. Vui lòng đợi vài phút và thử lại.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Địa chỉ email không đúng định dạng.';
    }
    return { success: false, error: message };
  }
};

/**
 * Sign out from Admin session
 */
export const adminSignOut = async (): Promise<void> => {
  if (auth) {
    await signOut(auth);
  }
};

/**
 * Subscribe to Admin Auth State
 */
export const subscribeAdminAuth = (callback: (state: AdminUserState) => void): (() => void) => {
  if (!isFirebaseConfigured || !auth) {
    callback({ user: null, isAuthenticated: false, email: null, loading: false });
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    // If the user is logged in and not anonymous, treat as admin
    if (user && !user.isAnonymous) {
      callback({
        user,
        isAuthenticated: true,
        email: user.email,
        loading: false
      });
    } else {
      callback({
        user: null,
        isAuthenticated: false,
        email: null,
        loading: false
      });
    }
  });
};
