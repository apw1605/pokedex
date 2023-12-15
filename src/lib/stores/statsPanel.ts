import { create } from 'zustand'

export type StatID =
  | 'ABILITIES'
  | 'EVOLUTIONS'

type StatsPanelState = {
  abilitiesActive: boolean
  evolutionsActive: boolean
  toggleState: (stat: StatID) => void
}

export const useStatsPanelStore = create<StatsPanelState>()((set) => ({
  abilitiesActive: false,
  evolutionsActive: false,

  toggleState: (stat: StatID) =>
    set((state) => {
      switch (stat) {
        case 'ABILITIES':
          return { abilitiesActive: !state.abilitiesActive }
        case 'EVOLUTIONS':
          return { evolutionsActive: !state.evolutionsActive }
      }
    }),
}))
