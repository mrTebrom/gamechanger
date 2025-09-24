// Проверка email
export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Проверка пароля (≥6 символов, хотя бы 1 заглавная, хотя бы 1 цифра)
export const validatePassword = (password: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
};
