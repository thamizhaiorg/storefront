import { createDB } from '../lib/instantdb.js';

// Get app ID from global variable set by Astro
const appId = window.APP_ID;
const db = createDB(appId);

// DOM elements
const authStatusEl = document.getElementById('auth-status');
const authStatusTextEl = document.getElementById('auth-status-text');
const testEmailEl = document.getElementById('test-email');
const sendCodeBtn = document.getElementById('send-code-btn');
const codeSectionEl = document.getElementById('code-section');
const testCodeEl = document.getElementById('test-code');
const verifyCodeBtn = document.getElementById('verify-code-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const messagesEl = document.getElementById('messages');
const debugTextEl = document.getElementById('debug-text');

let currentUser = null;
let sentEmail = '';

// Utility functions
function showMessage(message, type = 'info') {
  const colors = {
    success: 'text-green-600 bg-green-50 border-green-200',
    error: 'text-red-600 bg-red-50 border-red-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200'
  };
  
  messagesEl.innerHTML = `
    <div class="p-3 rounded border ${colors[type]}">
      ${message}
    </div>
  `;
}

function updateDebug(info) {
  debugTextEl.textContent = JSON.stringify(info, null, 2);
}

function updateAuthStatus() {
  if (currentUser) {
    authStatusEl.className = 'mb-6 p-4 rounded bg-green-50 border border-green-200';
    authStatusTextEl.innerHTML = `
      <span class="text-green-600">Authenticated</span><br>
      <span class="text-sm text-gray-600">Email: ${currentUser.email}</span><br>
      <span class="text-sm text-gray-600">ID: ${currentUser.id}</span>
    `;
    signOutBtn.classList.remove('hidden');
  } else {
    authStatusEl.className = 'mb-6 p-4 rounded bg-gray-50 border border-gray-200';
    authStatusTextEl.innerHTML = '<span class="text-gray-600">Not authenticated</span>';
    signOutBtn.classList.add('hidden');
  }
}

// Auth event handlers
sendCodeBtn.addEventListener('click', async () => {
  const email = testEmailEl.value.trim();
  if (!email) {
    showMessage('Please enter an email address', 'error');
    return;
  }

  sendCodeBtn.disabled = true;
  sendCodeBtn.textContent = 'Sending...';
  
  try {
    updateDebug({ action: 'sendMagicCode', email, timestamp: new Date().toISOString() });
    
    await db.auth.sendMagicCode({ email });
    
    sentEmail = email;
    codeSectionEl.classList.remove('hidden');
    showMessage(`Magic code sent to ${email}`, 'success');
    testCodeEl.focus();
    
    updateDebug({ 
      action: 'sendMagicCode', 
      email, 
      status: 'success', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Error sending magic code:', error);
    showMessage(`Error: ${error.body?.message || error.message}`, 'error');
    
    updateDebug({ 
      action: 'sendMagicCode', 
      email, 
      error: error.body || error.message, 
      timestamp: new Date().toISOString() 
    });
  } finally {
    sendCodeBtn.disabled = false;
    sendCodeBtn.textContent = 'Send Magic Code';
  }
});

verifyCodeBtn.addEventListener('click', async () => {
  const code = testCodeEl.value.trim();
  if (!code) {
    showMessage('Please enter the magic code', 'error');
    return;
  }

  verifyCodeBtn.disabled = true;
  verifyCodeBtn.textContent = 'Verifying...';
  
  try {
    updateDebug({ 
      action: 'signInWithMagicCode', 
      email: sentEmail, 
      code, 
      timestamp: new Date().toISOString() 
    });
    
    const result = await db.auth.signInWithMagicCode({ email: sentEmail, code });
    
    showMessage('Successfully signed in!', 'success');
    codeSectionEl.classList.add('hidden');
    testCodeEl.value = '';
    
    updateDebug({ 
      action: 'signInWithMagicCode', 
      email: sentEmail, 
      code, 
      result, 
      status: 'success', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    showMessage(`Error: ${error.body?.message || error.message}`, 'error');
    testCodeEl.value = '';
    testCodeEl.focus();
    
    updateDebug({ 
      action: 'signInWithMagicCode', 
      email: sentEmail, 
      code, 
      error: error.body || error.message, 
      timestamp: new Date().toISOString() 
    });
  } finally {
    verifyCodeBtn.disabled = false;
    verifyCodeBtn.textContent = 'Verify Code';
  }
});

signOutBtn.addEventListener('click', async () => {
  try {
    await db.auth.signOut();
    showMessage('Signed out successfully', 'success');
    codeSectionEl.classList.add('hidden');
    testEmailEl.value = '';
    testCodeEl.value = '';
    sentEmail = '';
    
    updateDebug({ 
      action: 'signOut', 
      status: 'success', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Error signing out:', error);
    showMessage(`Error: ${error.message}`, 'error');
    
    updateDebug({ 
      action: 'signOut', 
      error: error.message, 
      timestamp: new Date().toISOString() 
    });
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Subscribe to auth changes
  db.auth.onChange((auth) => {
    currentUser = auth.user;
    updateAuthStatus();
    
    updateDebug({ 
      action: 'authChange', 
      user: currentUser, 
      timestamp: new Date().toISOString() 
    });
  });

  updateDebug({ 
    action: 'init', 
    appId: appId, 
    timestamp: new Date().toISOString() 
  });
});
