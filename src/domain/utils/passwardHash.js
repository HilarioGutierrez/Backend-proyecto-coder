import bcrypt from "bcryptjs";

export const createHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

export const isValidPassword = async (password, user) => {
    const compare = await bcrypt.compare(password, user);
    return compare;
}
