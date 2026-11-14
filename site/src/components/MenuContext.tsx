import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface MenuState {
  open: boolean
  setOpen: (open: boolean) => void
}

const MenuContext = createContext<MenuState | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => ({ open, setOpen }), [open])
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu() {
  const value = useContext(MenuContext)
  if (!value) throw new Error('MenuProvider is missing')
  return value
}
