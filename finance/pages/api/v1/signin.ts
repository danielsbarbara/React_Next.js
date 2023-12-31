import { createNewAccount } from "@/logic/backend/createNewAccount";
import { registerNewUser } from "@/logic/backend/registerNewUser";
import { NextApiRequest, NextApiResponse } from "next";

interface newUserInfo {
    name: string,
    email: string,
    password: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userInfo: newUserInfo = req.body 
    const result: Boolean | string = await registerNewUser(userInfo)
     if(!result) return res.status(401).json({result: 'This email already exists'})
     const {email}: newUserInfo = req.body
    setTimeout(() => createNewAccount(email), 1000)
    return res.status(200).json({result: result})
}