export const registerValidation = (body) =>{
    const {name, email, password} = body;

    if (!name || !email || !password) {
        return "Name, email, and password are required fields."
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters long"
    }
}