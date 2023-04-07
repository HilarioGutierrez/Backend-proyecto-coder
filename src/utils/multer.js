import multer from "multer";
import {resolve} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resolve('src/public'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

export const uploader = multer({ storage });