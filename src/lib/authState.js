// Authentication state management for client-side
import { getDB } from './instantdb.js';

class AuthState {
  constructor() {
    this.user = null;
    this.isLoading = true;
    this.error = null;
    this.listeners = [];
    this.unsubscribe = null;

    // Initialize auth state on client-side only
    if (typeof window !== 'undefined') {
      // Wait for DB to be available
      this.initWhenReady();
    }
  }

  initWhenReady() {
    const tryInit = () => {
      const db = getDB();
      if (db) {
        this.init(db);
      } else {
        // Retry after a short delay
        setTimeout(tryInit, 100);
      }
    };
    tryInit();
  }

  init(db) {
    // Subscribe to auth changes
    this.unsubscribe = db.auth.onChange((auth) => {
      this.user = auth.user;
      this.isLoading = false;
      this.error = auth.error;
      this.notifyListeners();
    });
  }

  // Add listener for auth state changes
  addListener(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notify all listeners of state changes
  notifyListeners() {
    this.listeners.forEach(callback => {
      callback({
        user: this.user,
        isLoading: this.isLoading,
        error: this.error
      });
    });
  }

  // Get current auth state
  getState() {
    return {
      user: this.user,
      isLoading: this.isLoading,
      error: this.error
    };
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.user;
  }

  // Sign out
  async signOut() {
    const db = getDB();
    if (!db) {
      return { success: false, error: 'Database not available' };
    }

    try {
      await db.auth.signOut();
      this.user = null;
      this.error = null;
      this.notifyListeners();
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      this.error = error;
      this.notifyListeners();
      return { success: false, error: error.message };
    }
  }

  // Clean up
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.listeners = [];
  }
}

// Create singleton instance
export const authState = new AuthState();

// Convenience functions
export function useAuth() {
  return authState.getState();
}

export function onAuthChange(callback) {
  return authState.addListener(callback);
}

export function isAuthenticated() {
  return authState.isAuthenticated();
}

export function signOut() {
  return authState.signOut();
}
