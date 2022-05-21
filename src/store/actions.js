import { isValidToken } from '../services/auth';

/**
 *
 * @param {String} view A string from the following values:
 * - Profile
 * - Favorites *Only when logged in through a client account
 * - Jobs
 * - PQRs
 * - PaymentHistory
 * @returns void
 */
export const setView = (view) => ({ type: 'SET_VIEW', payload: view });
export const setUser = (res) => ({ type: 'SET_USER', payload: res });
export const setGlobalError = (err) => ({ type: 'SET_GLOBAL_ERROR', payload: err });
export const emptyUser = () => ({ type: 'EMPTY_USER' });
/**
 * @param {Object} message An object with the following properties:
 * - title: The title of the message
 * - text: The text of the message
 * - button: The text of the button
 * - link: The reference used in navigate() function
 * @returns void
 */
export const activateMiddle = (message) => ({ type: 'ACTIVATE_MIDDLE', payload: message });
export const deactivateMiddle = () => ({ type: 'DEACTIVATE_MIDDLE' });

export const fetchUserProfile = () => async (dispatch) => {
  try {
    const response = await isValidToken();
    const data = await response.json();
    if (data.error) { throw new Error(data.message); }
    dispatch(setUser(data));
  } catch (error) {
    window.localStorage.removeItem('user');
    dispatch(setGlobalError(error.message));
  }
};