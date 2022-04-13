import { useState } from "react";
import Cookies from "universal-cookie";

const SignUp = () => {
    const cookies = new Cookies();

    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isSignup, setIsSignup] = useState(true);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const getEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const getUsername = (e) => {
        const username = e.target.value;
        setUsername(username)
    };

    const getPassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newUserReqBody = {
            "username": username,
            "email": email,
            "password": password,
        };

        let registeredUserReqBody = {
            "identifier": username,
            "password": password
        }

            fetch(`http://localhost:1337/api/auth${isSignup? '/local/register': '/local'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: isSignup
            ? JSON.stringify(newUserReqBody) 
            : JSON.stringify(registeredUserReqBody)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong");
            }
        }).then((data) => {
            const token = data.jwt;
            const {email, username, id} = data.user;
            
            cookies.set("token", token);
            cookies.set("email", email);
            cookies.set("username", username);
            cookies.set("id", id);
            
            const options = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
                
            }
            return fetch(`http://localhost:1337/api/stream-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                body: JSON.stringify({user: username})
            })
        })
        .then(async (res) => await res.json())
        .then((data) => {
            const streamToken = data.streamToken;
            cookies.set("streamToken", streamToken);
            window.location.assign(`http://localhost:3000/`);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return(
        <div className="signup_form_container">
            <h2>Sign up for an account:</h2>
            <form 
                className="signup_form"
                onSubmit={(e) => handleSubmit(e)}
                >
                {isSignup && (
                    <>
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => getEmail(e)} type="text" name="email" id="email"/>
                    </>
                )}
                <label htmlFor="username">Username:</label>
                <input onChange={(e) => getUsername(e)} type="text" name="username" id="username" />
                <label htmlFor="password">Password:</label>
                <input onChange={(e) => getPassword(e)} type="password" id="password" name="password" />
                <button type="submit">Submit</button>
            </form>
            <div>
                <p>
                    {isSignup 
                    ? "Already have an account? "
                    : "Don't have an account? "}
                    <span onClick={switchMode}>
                        {isSignup ? "Log in." : "Sign up."}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignUp;