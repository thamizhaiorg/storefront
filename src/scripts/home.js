import { createDB } from '../lib/instantdb.js';

// Get app ID from global variable set by Astro
const appId = window.APP_ID;
const db = createDB(appId);

// Auth state management
let currentUser = null;
let authUnsubscribe = null;

// Update auth buttons based on user state
function updateAuthButtons() {
  const authButtonsEl = document.getElementById('auth-buttons');
  const ctaAuthButtonEl = document.getElementById('cta-auth-button');
  
  if (currentUser) {
    // User is logged in
    authButtonsEl.innerHTML = `
      <div class="flex items-center gap-4">
        <span class="text-white">Welcome, ${currentUser.email}</span>
        <button id="sign-out-btn" class="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
          Sign Out
        </button>
      </div>
    `;
    
    ctaAuthButtonEl.innerHTML = `
      <button id="sign-out-cta-btn" class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Sign Out
      </button>
    `;
    
    // Add sign out event listeners
    document.getElementById('sign-out-btn')?.addEventListener('click', signOut);
    document.getElementById('sign-out-cta-btn')?.addEventListener('click', signOut);
  } else {
    // User is not logged in
    authButtonsEl.innerHTML = `
      <a href="/auth/login" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
        Get Started
      </a>
    `;
    
    ctaAuthButtonEl.innerHTML = `
      <a href="/auth/login" class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Get Started Today
      </a>
    `;
  }
}

// Sign out function
async function signOut() {
  try {
    await db.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Load stores and auth on page load
document.addEventListener('DOMContentLoaded', () => {
  const loadingEl = document.getElementById('stores-loading');
  const gridEl = document.getElementById('stores-grid');
  const emptyEl = document.getElementById('stores-empty');
  const errorEl = document.getElementById('stores-error');

  // Subscribe to auth changes
  authUnsubscribe = db.auth.onChange((auth) => {
    currentUser = auth.user;
    updateAuthButtons();
  });

  try {
    // Subscribe to stores data
    db.subscribeQuery({ storefronts: {} }, (resp) => {
      loadingEl.classList.add('hidden');

      if (resp.error) {
        console.error('Error loading stores:', resp.error);
        errorEl.classList.remove('hidden');
        return;
      }

      const stores = resp.data?.storefronts || [];

      if (stores.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
      }

      // Render stores
      gridEl.innerHTML = stores.map(store => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">${store.name}</h3>
            <p class="text-gray-600 mb-4">Discover amazing products and deals</p>
            <a
              href="/store/${store.id}/"
              class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Visit Store
            </a>
          </div>
        </div>
      `).join('');

      gridEl.classList.remove('hidden');
    });
  } catch (error) {
    console.error('Error initializing stores:', error);
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
  }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (authUnsubscribe) {
    authUnsubscribe();
  }
});
