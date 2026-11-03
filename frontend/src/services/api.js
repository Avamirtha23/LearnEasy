/**
 * LearnEasy API Service Layer
 * All frontend HTTP calls go through this module.
 * Base URL is read from VITE_API_BASE_URL in .env (defaults to http://localhost:5000/api)
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ─── Generic fetch wrapper ───────────────────────────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    // Surface the server error message to the caller
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

// ─── Subjects API ─────────────────────────────────────────────────────────────
export const subjectsAPI = {
  getAll: (category = '') =>
    apiFetch(category ? `/subjects?category=${encodeURIComponent(category)}` : '/subjects'),

  getById: (id) => apiFetch(`/subjects/${id}`),
};

// ─── Tutors API ───────────────────────────────────────────────────────────────
export const tutorsAPI = {
  getAll: (subjectId = '') =>
    apiFetch(subjectId ? `/tutors?subject=${subjectId}` : '/tutors'),

  getById: (id) => apiFetch(`/tutors/${id}`),
};

// ─── Contact API ──────────────────────────────────────────────────────────────
export const contactAPI = {
  submit: (formData) =>
    apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
};

// ─── Subscriptions API ────────────────────────────────────────────────────────
export const subscriptionsAPI = {
  create: (payload) =>
    apiFetch('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getByEmail: (email) => apiFetch(`/subscriptions/email/${encodeURIComponent(email)}`),

  getById: (id) => apiFetch(`/subscriptions/${id}`),
};

// ─── Health check ─────────────────────────────────────────────────────────────
export const healthAPI = {
  check: () => apiFetch('/health'),
};

