import {create} from 'zustand'

interface UIState{
    openDropdownId:string | null
    setOpenDropdownId:(id:string | null)=>void
}

export const useUIStore= create<UIState>((set)=>({
    openDropdownId:null,
    setOpenDropdownId:(id:string | null)=>set({openDropdownId:id})
}))