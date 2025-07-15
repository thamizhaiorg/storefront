import { createDB } from '../lib/instantdb.js';

// Get app ID from global variable set by Astro
const appId = window.APP_ID;
const db = createDB(appId);

let sentEmail = '';

// Email form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const submitBtn = document.getElementById('submit-btn');
  const messageDiv = document.getElementById('message');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  messageDiv.textContent = '';

  try {
    console.log('Attempting to send magic code for:', email);
    await db.auth.sendMagicCode({ email });
    console.log('Magic code sent successfully');

    sentEmail = email;
    document.getElementById('email-step').classList.add('hidden');
    document.getElementById('code-step').classList.remove('hidden');
    messageDiv.innerHTML = `<span class="text-green-600">Magic code sent to your email!</span>`;
    document.getElementById('code').focus();
  } catch (authError) {
    console.error('Auth error details:', authError);
    messageDiv.innerHTML = `<span class="text-red-600">${authError.body?.message || authError.message || 'Failed to send magic code'}</span>`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Magic Code';
  }
});

// Code verification
document.getElementById('verify-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = document.getElementById('code').value;
  const verifyBtn = document.getElementById('verify-btn');
  const messageDiv = document.getElementById('message');

  verifyBtn.disabled = true;
  verifyBtn.textContent = 'Verifying...';
  messageDiv.textContent = '';

  try {
    const result = await db.auth.signInWithMagicCode({ email: sentEmail, code });
    messageDiv.innerHTML = `<span class="text-green-600">Login successful!</span>`;

    // Store user info if needed
    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
    }

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (authError) {
    console.error('Auth error:', authError);
    messageDiv.innerHTML = `<span class="text-red-600">${authError.body?.message || 'Invalid magic code'}</span>`;
    document.getElementById('code').value = '';
    document.getElementById('code').focus();
  } finally {
    verifyBtn.disabled = false;
    verifyBtn.textContent = 'Verify Code';
  }
});

// Back button
document.getElementById('back-btn').addEventListener('click', () => {
  document.getElementById('code-step').classList.add('hidden');
  document.getElementById('email-step').classList.remove('hidden');
  document.getElementById('message').textContent = '';
  document.getElementById('code').value = '';
  document.getElementById('email').focus();
});
