import React, { useState } from "react"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const authURL = "https://stg.dhunjam.in/account/admin/login"

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const attemptLogin = async () => {
        setLoading(true)

        const loginValues = {
            "username": username,
            "password": password
        }

        try {
            const response = await fetch(authURL, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginValues)
            })

            if (!response.ok) {
                setError('The username or password is incorrect.')
                return
            }

            navigate("/dashboard")
        } catch (e) {
            setError("An error occurred while attempting to contact API.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="h-screen flex flex-col justify-center items-center gap-y-5">
                <h1>Venue Admin Login</h1>
                <form>
                    <div className="flex flex-col mt-3 gap-y-5 text-white mb-2">
                        <input className="h-12 bg-black focus:outline-none p-2 rounded-xl border border-white placeholder-white" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <div className="flex flex-row relative items-center justify-between">
                            <input type={passwordVisible ? 'text' : 'password'} className="h-12 w-[600px] bg-black focus:outline-none p-2 pr-12 rounded-xl border border-white placeholder-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className="btn absolute right-0 mr-5" onClick={() => setPasswordVisible(!passwordVisible)} type="button">
                                {passwordVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
                            </button>
                        </div>
                    </div>
                    <p className="text-red-800">{error}</p>
                    <button onClick={attemptLogin} disabled={loading} type="button" className="btn bg-buttonColor p-2 w-[600px] rounded-xl font-bold mt-3">
                        Sign in
                    </button>
                </form>
                <p>New Registration ?</p>
            </div>
        </div>
    )
}

export default Login
