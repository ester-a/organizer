import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from '../supabase/supabase-client'

const AuthContext = createContext({}); 

//muj vlastni hook
export const useAuth = () => useContext(AuthContext)

// slozity zpusob
// import {useContext} from 'react'
// import {AuthContext} from 'AuthContext.jsx'

// zjednoduseny zpusob importu do komponent, kdyz mam vlastni hook
// import {useAuth} from 'AuthContext'

// function Component() {
    
//     const { data } = useAuth()
// }

//children - vnorene komponenty, poskytnu jim data z toho kontextu
//children vsechny veci, kter0 jsou zabalene do  <AuthContext.Provider></AuthContext.Provider>

async function login(email, password) {
    return await supabase.auth.signInWithPassword({ email, password})
}

async function logout(email, password) {
    return await supabase.auth.signOut()
}

async function register(email, password, firstName, lastName, age) {
    return await supabase.auth.signUp
    ({ 
        email,
			password,
			options: {
			  data: {
				firstName,
				lastName,
				age,
			  }
			}
    })
}


export function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(  //kdzkoli se uzivatel prihlasi nebo odhlasi, tak se spusti tato fce a ja podle ni, jestli doslo k prihlaseni nebo odhlaseni, tak se nastavi useState
        () => {
            const {data} = supabase.auth.onAuthStateChange((event, session) => { 
                if (event === 'SIGNED_IN') {
                    setIsAuth(true)
                    setUser(session.user)
                }
                if (event === 'SIGNED_OUT') {
                    setIsAuth(false)
                    setUser(null)
                }
            }) //kdzy se zmeni status prihlaseni, zavola se tato fce
            //uklid, spusti se ay komponenta zanikne
            return () => {
                data.subscription.unsubscribe()
            }
        }, []
    )

    return (
         <AuthContext.Provider value={{
            user, // user: user, kdyz se oboji jmenuje stejne, muze byt jen jeden. prvni user = vlastnost value, druhy user je hodnota z UseState
            isAuth,
            login,
            logout,
            register,
         }}>
            {children}
         </AuthContext.Provider>
    )
}