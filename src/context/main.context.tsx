'use client'

import React, { createContext, useEffect, useState, useCallback } from 'react'

import { IMainContext, IUser } from '@/interfaces'

export const MainContext = createContext<IMainContext>({
  sync: async () => {},
})

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>()
  const [loaded, setLoaded] = useState(false)

  const sync = useCallback(async () => {
    try {
      const res = await fetch('/api/accounts/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        const { data } = await res.json()
        setUser(data)
      }
    } catch (err) {
      console.error('Erro ao sincronizar dados:', err)
    }
  }, [])

  useEffect(() => {
    sync().then(() => setLoaded(true))
  }, [sync])

  return (
    <MainContext.Provider value={{ user, sync }}>
      {loaded ? children : <h1>Loading...</h1>}
    </MainContext.Provider>
  )
}
