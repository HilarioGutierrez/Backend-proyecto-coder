import bcrypt from "bcrypt"

export const creatHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

export const isValidPassword = async (password, user) => {
    const compare = await bcrypt.compare(password, user);
    return compare;
}
