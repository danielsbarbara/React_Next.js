import { getLeaderBoard } from "@/logic/backend/getLeaderBoard";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const leaderboardDate = req.query.leaderboard
    try{
        if (typeof leaderboardDate === 'string'){
            const date = leaderboardDate
            const leaderboard = await getLeaderBoard(date)
            res.status(200).json({result: leaderboard})
        }
    } catch(err){
        res.status(400).json({result: err})
    }
}