import multer from 'multer'
import path from 'path'

const __uploadDir = path.join(path.resolve(),'./assets/uploads')
console.log(__uploadDir)

    const storage   = multer.diskStorage({     /*since you arent relying on the req/res cycle unlike authorize ,there is no need to call next for 
                                                the control to move on to the subsequent middleware or req handlers*/
    destination: (req,file,cb) => {
        return cb(null,__uploadDir);
    },
    filename:(req,file,cb)=>{
        return cb(null,Date.now()+ '-' + file.originalname)
    }
  }
)

const upload = multer({storage : storage})
const uploadFile = upload.single('image')

export default uploadFile