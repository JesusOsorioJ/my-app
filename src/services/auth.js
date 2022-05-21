const API_URL = process.env.REACT_APP_AUTH_BASE_URL;

export async function userLogin(body) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function userLogOut() {
  window.localStorage.removeItem('user');
}

export async function isValidToken() {
  try {
    const payload = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: window.localStorage.getItem('user') }),
    };
    const response = await fetch(`${API_URL}/validateToken`, payload);
    return response;
  } catch (error) {
    return error;
  }
}