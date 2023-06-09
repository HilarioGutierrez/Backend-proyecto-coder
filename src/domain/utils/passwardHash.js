import bcrypt from 'bcrypt';

export const creatHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

export const isValidPassword = async (password, user) => {
    const comapre = await bcrypt.compare(password, user);
    return comapre;
}
