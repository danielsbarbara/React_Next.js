interface ButtonLogInProps{
    description: string
    buttonAction: Function
}

export function ButtonLogIn({description, buttonAction}: ButtonLogInProps){
    return(
        <>
            <button 
            className="bg-black w-32 h-9 text-white text-lg rounded-2xl"
            onClick={() => buttonAction(description)}>{description}</button>
        </>
    )
}