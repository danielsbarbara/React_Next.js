import { Forms } from "@/components/Forms/Forms";
import { LogInButtons } from "@/components/LogInButtons/LogInButtons";
import { Titlelogin } from "@/components/TitleLogin/Titlelogin";
import { LoginSigninText } from "@/components/loginOrsigninText/LogInSigninText";
import styles from "./Login.module.css"
import { useState } from "react";
import { logIn } from "@/logic/frontend/login/fetchLogIn";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchSignin } from "@/logic/frontend/login/fetchSigin";
import { useRouter } from "next/navigation";


export default function Login() {
    const [isLogin, setisLogin] = useState(true)
    const [info, setInfo] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [blockButton, setBlockButton] = useState(false)
    const router = useRouter()
    const notifyS = (msg: string) => toast.success(msg)
    const notifyE = (msg: string) => toast.error(msg)

    async function submit(description: string) {
        if (description === "Register") return setisLogin(false)
        if (description === "Back") return setisLogin(true)
        if (description === "Enter") {
            setBlockButton(true)
            const result: string = await logIn(info)
            if (typeof result === 'string') return notifyE(result)
            notifyS("Welcome!")
            localStorage.setItem("token", JSON.stringify(result))
            setTimeout(() => {
                setBlockButton(false)
                router.push('app/HomePage/Home')
            }, 2000)
            return
        } else if (description === "Submit") {
            setBlockButton(true)
            const result: string | Boolean = await fetchSignin(info)
            if (typeof result === 'string') return notifyE(result)
            notifyS("Registration successful")
            setisLogin(true)
            setBlockButton(false)
            return
        }
    }
    return (
        <div className={styles.page}>
            <div className={styles.titles}>
                <Titlelogin title="Finance Flow"/>
                <div className={styles.loginWithLines}>
                    <span className={styles.line}/>
                    <LoginSigninText text={isLogin ? "Log In" : "Sign In"} />
                    <span className={styles.line}/>
                </div>
            </div>
            <div className={styles.forms}>
                {!isLogin && <Forms description="Name" type="text" info={info} setInfo={setInfo} />}
                <Forms description="Email" type="email" info={info} setInfo={setInfo} />
                <Forms description="Password" type="password" info={info} setInfo={setInfo} />
                {!isLogin && <Forms description="Confirm Password" type="password" info={info} setInfo={setInfo} />}
            </div>
            {blockButton ? <div className={styles.loading}/>
             :<div className={styles.button}>
                <LogInButtons description={isLogin ? "Enter" : "Submit"} submit={submit}/>
                <LogInButtons description={isLogin ? "Register" : "Back"} submit={submit}/>
            </div>}
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <video src="/videos/loginVideo.mp4" autoPlay muted loop className={styles.video}></video>
        </div>
    )
}