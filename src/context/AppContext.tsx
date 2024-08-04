import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export type User = {
  email: string,
  token: string
}

export interface AppContextInterface {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
  user: {
    email: '',
    token: ''
  },
  setUser: () => {}
} as AppContextInterface

export const AppContext = createContext<AppContextInterface>(defaultState)

type UserProviderProps = {
  children: ReactNode
}

const AppProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(defaultState.user)

  useEffect(() => {
    console.log("UE", user)
  }, [user])
  
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
