import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'



const SignUp = () => {

    const [formInputs, setFormInputs] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const url = "http://localhost:4000/api/v1/signup"
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInputs(prevState => ({...prevState, [name]: value}))
    }

    const payload = {
        username: formInputs.username,
        email: formInputs.email,
        password: formInputs.password
      }

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        const res = axios.post(url,payload)
        .then(response => {
            setSuccess(response.data.message)
            setLoading(false)
            setTimeout(() => {
                setSuccess('')
                navigate('/signin')
            }, 5000)
        })
        .catch(err => {
            if(err.response) {
                setError(err.response.data.message)
                setLoading(false)
                setTimeout(() => {
                    setError('')
                }, 5000)

                setFormInputs({
                    username: '',
                    email: '',
                    password: ''
                })
            }
        })

  
    }

    
    return(
        <div className=" max-w-xl mx-auto border-2 p-20 mt-24 bg-slate-600 rounded-lg">
            {success && <p className="text-center bg-green-600 p-4 text-xl text-white">{success}</p>}
            {error && <p className="text-center bg-red-600 p-4 text-xl text-white">{error}</p>}
            <h1 className="text-center py-7 mb-5 text-5xl font-semibold text-white">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-xl">
                <input onChange={ handleChange } type="text" value={formInputs.username} name="username" placeholder="username" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <input onChange={ handleChange } type="email" value={formInputs.email} name="email" placeholder="email" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <input onChange={ handleChange } type="password" value={formInputs.password} name="password" placeholder="password" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <button className="bg-slate-800 border opacity-50 text-white p-4 mt-4 rounded-lg text-2xl font-medium shadow-xl" type="submit">
                    {loading ? "loading..." : "Submit"}
                </button>
            </form>
            <div className="flex items-center gap-2 mt-3">
                <p className="text-white">Have an Account ?</p>
                <Link to='/signin' >
                    <span className="text-sky-400 font-medium text-lg">sign in</span>
                </Link>
            </div>
        </div>
    )
}



export default SignUp