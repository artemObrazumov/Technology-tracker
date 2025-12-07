import useLocalStorage from './useLocalStorage';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [user, setUser] = useLocalStorage('user', null);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      const userData = {
        id: 1,
        username: username,
        joinDate: new Date().toISOString()
      };
      
      setIsLoggedIn(true);
      setUser(userData);
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Неверный логин или пароль' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return {
    isLoggedIn,
    user,
    login,
    logout
  };
}

export default useAuth;