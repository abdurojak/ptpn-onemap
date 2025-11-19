// stores/useFileStore.ts
import { create } from 'zustand'

type FileStore = {
    shouldRefresh: boolean
    triggerRefresh: () => void
    clearRefresh: () => void
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export const useFileStore = create<FileStore>((set) => ({
    shouldRefresh: false,
    triggerRefresh: () => set({ shouldRefresh: true }),
    clearRefresh: () => set({ shouldRefresh: false }),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}))
