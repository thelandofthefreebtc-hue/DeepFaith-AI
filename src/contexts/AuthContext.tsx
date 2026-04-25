import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  verifyWorldId: () => Promise<void>;
  updateRisk: (risk: 'low' | 'medium' | 'high') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Simple auto-onboarding for demo
        const userRef = doc(db, 'users', u.uid);
        onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          } else {
            // New user initialization
            setDoc(userRef, {
              uid: u.uid,
              email: u.email || 'demo@globalwealth.app',
              displayName: u.displayName || 'Wealth Pioneer',
              riskTolerance: 'medium',
              language: 'en',
              worldIdVerified: false,
              totalBalance: 1250.42,
              xp: 0,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            }).catch(e => handleFirestoreError(e, OperationType.CREATE, 'users/' + u.uid));
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, 'users/' + u.uid);
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const verifyWorldId = async () => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { worldIdVerified: true, updatedAt: serverTimestamp() }, { merge: true })
      .catch(e => handleFirestoreError(e, OperationType.UPDATE, 'users/' + user.uid));
  };

  const updateRisk = async (risk: 'low' | 'medium' | 'high') => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { riskTolerance: risk, updatedAt: serverTimestamp() }, { merge: true })
      .catch(e => handleFirestoreError(e, OperationType.UPDATE, 'users/' + user.uid));
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, verifyWorldId, updateRisk }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
