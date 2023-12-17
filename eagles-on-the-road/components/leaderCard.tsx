interface LProps{
    data: any,
    showFields: number
}

interface dataType {

}

export function LeaderCard({data, showFields}: LProps){

    const field = showFields === 1 ? 'resutlPratice' : showFields === 2 ? 'resultRuns' : showFields === 3 ? 'allTypes' : ''

    return(
        <div className="flex flex-col items-center gap-4 text-xl"> 
           {field && data[field]?.map((el: any, i:number) => 
            <div
            className={`flex justify-around ${i === 0 ? 'bg-orange-200' : i === 1 ? 'bg-gray-300' : i === 2 ? 'bg-orange-400' : 'bg-white'}
            h-16 w-11/12 rounded-lg`} 
            key={i}>
            <p className="text-[1.8rem] self-center">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}</p>
            <img src="#" className="self-center"/>
            <p className="self-center">{el.name}</p>
            <p className="self-end">{el.distance ? el.distance : 0} kms</p>
            </div>
            )} 
        </div>
    )
}