const SignIn = () => {
    return(
        <div className=" max-w-xl mx-auto border-2 p-20 mt-24 bg-slate-600 rounded-lg">
            <h1 className="text-center py-7 mb-5 text-5xl font-semibold text-white">Sign In</h1>
            <form className="flex flex-col gap-4 shadow-xl">
                <input type="email" name="" id="" placeholder="email" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <input type="password" name="" id="" placeholder="password" className="bg-slate-100 p-4 rounded-lg text-lg" />
                <button className="bg-slate-800 border opacity-50 text-white p-4 mt-4 rounded-lg text-2xl font-medium shadow-xl" type="submit">Submit</button>
            </form>
            {/* <div className="flex items-center gap-2 mt-3">
                <p className="text-white">Have an Account ?</p>
                <Link to='/signin' >
                    <span className="text-sky-400 font-medium text-lg">sign in</span>
                </Link>
            </div> */}
        </div>
    )
}



export default SignIn