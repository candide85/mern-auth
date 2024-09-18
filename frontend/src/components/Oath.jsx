import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import  { app } from "../firebase/firebase.js"
import { useDispatch } from 'react-redux'
import { succesSignin } from '../redux/user/userSlice.js'


// axios.defaults.withCredentials = true


const Oath = () => {
    const dispatch = useDispatch()
    const handleGoogleLogin = async () => {

        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)

            const res = await fetch("/api/v1/google", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })

            const data = await res.json()
            dispatch(succesSignin(data))
            
        } catch (error) {
            console.error('Error during sign-in:', error);
        }



    }

    return(
        <button type="button" onClick={handleGoogleLogin} className="bg-red-800 border text-white p-4 rounded-lg text-2xl font-medium shadow-xl">Continue with Google</button>
    )
}



export default Oath