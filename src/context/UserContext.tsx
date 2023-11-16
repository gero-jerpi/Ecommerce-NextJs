import {createContext, useState} from "react"

let initialUser = {
    name: "",
}

export const UserContext = createContext(initialUser)

export function UserProvider({children}: {children: React.ReactNode}){
    const [user, setUser] = useState(initialUser)

    return(
        //@ts-ignore
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}


