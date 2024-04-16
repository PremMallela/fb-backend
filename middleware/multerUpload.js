import multer from 'multer'
import path from 'path';

const __uploadDir = path.join(path.resolve(), './assets/uploads');
console.log(__uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, __uploadDir);
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now()+process.env.SERVER_ID+getFileType(file.originalname));
  }
});

const upload = multer({ storage: storage });
const uploadFile = upload.array('images');

function getFileType(filename) {
    const lastDotIndex = filename.lastIndexOf('.');
    const type = filename.substring(lastDotIndex);
    return type;
}

export default uploadFile;