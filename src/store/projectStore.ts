import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectState {
  projectId: string | null
  setProjectId: (id: string) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projectId: null,
      setProjectId: (id: string) => set({ projectId: id }),
    }),
    {
      name: 'project-storage', // key in localStorage
    }
  )
)