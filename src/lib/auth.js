// Client-side authentication utilities
import { getDB } from './instantdb.js';

// Get the database instance (client-side only)
export function getClientDb() {
  if (typeof window === 'undefined') {
    return null;
  }
  return getDB();
}

// Send magic code (client-side)
export async function sendMagicCode(email) {
  const clientDb = getClientDb();
  if (!clientDb) {
    throw new Error('Client database not available');
  }

  try {
    await clientDb.auth.sendMagicCode({ email });
    return { success: true, message: 'Magic code sent to your email!' };
  } catch (error) {
    console.error('Error sending magic code:', error);
    throw new Error(error.body?.message || 'Failed to send magic code');
  }
}

// Verify magic code (client-side)
export async function verifyMagicCode(email, code) {
  const clientDb = getClientDb();
  if (!clientDb) {
    throw new Error('Client database not available');
  }

  try {
    const result = await clientDb.auth.signInWithMagicCode({ email, code });
    return {
      success: true,
      message: 'Login successful!',
      user: result.user
    };
  } catch (error) {
    console.error('Error verifying magic code:', error);
    throw new Error(error.body?.message || 'Invalid magic code');
  }
}

// Get current user (client-side)
export async function getCurrentUser() {
  const clientDb = getClientDb();
  if (!clientDb) {
    return null;
  }

  try {
    return await clientDb.auth.user();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Sign out (client-side)
export async function signOut() {
  const clientDb = getClientDb();
  if (!clientDb) {
    throw new Error('Client database not available');
  }

  try {
    await clientDb.auth.signOut();
    return { success: true, message: 'Signed out successfully' };
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
}

// Auth state listener
export function onAuthStateChange(callback) {
  const clientDb = getClientDb();
  if (!clientDb) {
    return () => {};
  }

  return clientDb.auth.onChange(callback);
}
