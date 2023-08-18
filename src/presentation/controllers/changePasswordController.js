import userManager from "../../domain/manager/userManager.js";
import { creatHash } from "../../domain/utils/passwardHash.js";

export const changePassword = async (req, res) => {
    try {
        const manager = new userManager();

        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (newPassword !== confirmPassword) {
            res.status(400).send({message: 'error', error: 'passwords do not match'});
        }

        const passwardHash = await creatHash(newPassword);

        await manager.updatePassword(req.user.email, {password: passwardHash});
        res.status(200).send({message: 'success', UserPassUpdate: req.user.email});

    } catch (error) {
        throw new Error(error);
    }
}