import { Form } from "@/components/Form";
import { Title } from "@/components/Title";
import { ButtonLogIn } from "@/components/buttonLogIn";
import { login } from "@/logic/frontend/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface getInfoType{
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function Loginpage(){
    const [getInfo, setInfo] = useState<getInfoType>({name: '', email: '', password: '', confirmPassword: ''})
    const [register, setRegister] = useState<Boolean | undefined>(false)
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()
    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);

    async function buttonActions(description: string) {
        if(description === 'Registar') return setRegister(true)
        if(description === 'Cancelar') return setRegister(false)
        setLoading(true)
        const result = await login(description, getInfo)

        if(typeof result === 'string') {
            setLoading(false)
            return notifyError(result)
        }
        if(typeof result === 'boolean') {
            notifySuccess('Conta criada!')
           return setTimeout(() => {
            setLoading(false)
            setRegister(false)
           },1500)
        }
        localStorage.setItem('jwt', JSON.stringify(result.token))
        localStorage.setItem('userId', JSON.stringify(result._id))
        notifySuccess('Bem vindo!')
        setTimeout(() => {
            router.push('/app/home')
            setLoading(false)
        }, 2000)
    }
    return(
        <>
        <div className="bg-eagle bg-cover bg-center h-screen flex flex-col justify-center items-center">
            <div className="-translate-y-40 text-[1.5rem] font-title">
                <Title title='Kuk'/>
            </div>
            <div className="-translate-y-28 text-[1rem] font-text">
                <Title title={register ? 'Registo' : 'Log In'}/>
            </div>
            <div className="h-40 flex flex-col gap-2">
                {register && <Form type='text' description='Nome' setInfo={setInfo} getInfo={getInfo}/>}
                <Form type='email' description='@email' setInfo={setInfo} getInfo={getInfo}/>
                <Form type='password' description='***Password***' setInfo={setInfo} getInfo={getInfo}/>
                {register && <Form type='password' description='Confirmar Password' setInfo={setInfo} getInfo={getInfo}/>}
            </div>
            {!loading ? <div className="flex gap-7 font-text">
                <ButtonLogIn description={register ? 'Submeter' : 'Entrar'} buttonAction={buttonActions}/>
                <ButtonLogIn description={register ? 'Cancelar' : 'Registar'} buttonAction={buttonActions}/>
            </div> :
                <div className="h-[30px] w-[30px] border-black border-[2px] border-t-white rounded-[50%] animate-spin"/>}
        </div>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            </>
    )
}