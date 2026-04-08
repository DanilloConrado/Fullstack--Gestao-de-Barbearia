const USER_NAME_KEY = 'barber_userName';
const ACTIVE_TAB_KEY = 'barber_activeTab';

/**
 * Stores the user name in localStorage after a successful login.
 */
export const setUserData = (name: string) => {
  localStorage.setItem(USER_NAME_KEY, name);
  localStorage.setItem(ACTIVE_TAB_KEY, 'clients'); // Default tab
};

/**
 * Retrieves the stored user name.
 */
export const getUserName = () => {
  return localStorage.getItem(USER_NAME_KEY);
};

/**
 * Checks if the user is currently authenticated.
 */
export const isAuthenticated = () => {
  return !!getUserName();
};

/**
 * Clears user data from localStorage (Logout).
 */
export const logout = () => {
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(ACTIVE_TAB_KEY);
};

/**
 * Stores the currently active dashboard tab.
 */
export const setActiveTab = (tab: string) => {
  localStorage.setItem(ACTIVE_TAB_KEY, tab);
};

/**
 * Retrieves the currently active dashboard tab.
 */
export const getActiveTab = () => {
  return localStorage.getItem(ACTIVE_TAB_KEY) || 'clients';
};