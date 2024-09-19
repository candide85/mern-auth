import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase/firebase"



const Profile = () => {
    const {currentUser} = useSelector(state => state.user)
    const fileRef = useRef(null)
    const [image, setImage] = useState(undefined)
    const [imageProgress, setImageProgress] = useState(0)

    useEffect(() => {
        if(image) {
            handleFileupload(image)
        }
    }, [image])

    const handleFileupload = async (image) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
                setImageProgress(Math.round(progress))
            }
        )
    }


    return( 
        // firebase storage rules

        // allow read;
        // allow write: if
        // request.resource.size < 2 * 1024 * 1024 &&
        // request.resource.contentType.matches('image/.*')

        <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-center my-14">PROFILE</h1>
            <form className="flex flex-col gap-4 w-96 max-w-lg mx-auto">
                <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <img onClick={() => fileRef.current.click()} className="w-36 cursor-pointer self-center rounded-full" src={currentUser.userP.profilePicture} alt="profile" />
                <p className="text-center text-red-600 mb-5">
                    image is uploading {image ? imageProgress : ""}%  done...
                </p>
                <input className="h-11 indent-2" type="text" name="username" placeholder="Username" defaultValue={currentUser.userP.username} />
                <input className="h-11 indent-2" type="email" name="email" placeholder="email" defaultValue={currentUser.userP.email}  />
                <input className="h-11 indent-2" type="password" name="password" placeholder="password" defaultValue='.............'  />
                <button className="bg-sky-900 h-12 rounded-lg text-white">UPDATE</button>
            </form>
            <div className="flex justify-between gap-2 mt-4 w-96 max-w-lg mx-auto">
                <span className="text-red-700 font-semibold cursor-pointer">Delete Account</span>
                <span className="text-red-700 font-semibold cursor-pointer">Sign out</span>
            </div>
        </div>
    )
}



export default Profile