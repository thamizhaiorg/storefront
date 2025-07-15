// Error handling utilities

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// Error handler for API routes
export function handleApiError(error) {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message,
      statusCode: error.statusCode
    }), {
      status: error.statusCode,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Handle InstantDB errors
  if (error.body?.message) {
    return new Response(JSON.stringify({
      success: false,
      message: error.body.message,
      statusCode: error.status || 500
    }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Generic error
  return new Response(JSON.stringify({
    success: false,
    message: 'Internal server error',
    statusCode: 500
  }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Async wrapper for better error handling
export function asyncHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

// Client-side error handler
export function handleClientError(error, context = '') {
  console.error(`Client Error ${context}:`, error);
  
  // Show user-friendly error message
  const message = error.message || 'Something went wrong. Please try again.';
  
  // You could integrate with a toast notification system here
  return {
    success: false,
    message,
    error: error
  };
}

// Retry utility for failed requests
export async function retryRequest(fn, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}

// Loading state manager
export class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
  }
  
  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.updateUI(key, isLoading);
  }
  
  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }
  
  updateUI(key, isLoading) {
    const element = document.getElementById(`${key}-loading`);
    const button = document.getElementById(`${key}-btn`);
    
    if (element) {
      element.classList.toggle('hidden', !isLoading);
    }
    
    if (button) {
      button.disabled = isLoading;
      if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
      } else {
        button.textContent = button.dataset.originalText || button.textContent;
      }
    }
  }
}

// Global loading manager instance
export const loadingManager = new LoadingManager();
