import { Card } from '@mui/material'
import { useStatsPanelStore } from '../../../lib/stores/statsPanel'
import { StatToggleButton } from '../../common/pokemonStats/statToggleButton'

export const StatsControllerPanel = () => {
  const {
    abilitiesActive,
    evolutionsActive,
  } = useStatsPanelStore()

  return (
    <Card className='w-28 grid grid-cols-1 gap-[0.375rem] text-xs md:text-sm font-bold '>

      <StatToggleButton
        isActive={abilitiesActive}
        text='Abilities'
        statId='ABILITIES'
      />
      <StatToggleButton
        isActive={evolutionsActive}
        text='Evolutions'
        statId='EVOLUTIONS'
      />
    </Card>
  )
}
