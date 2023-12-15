import { Button } from '@material-ui/core'
import type { StatID } from '../../../lib/stores/statsPanel'
import { useStatsPanelStore } from '../../../lib/stores/statsPanel'

type StatToggleButtonProps = {
  isActive: boolean
  text: string
  statId: StatID
}

export const StatToggleButton = ({
  isActive,
  text,
  statId,
}: StatToggleButtonProps) => {
  const toggleState = useStatsPanelStore((state) => state.toggleState)

  return (
    <Button
      className={` rounded-md border-gray-800 p-1 transition-all ${isActive
        ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 '
        : 'border-spacing-6  text-red-600'
        }`}
      onClick={() => toggleState(statId)}
    >
      {text}
    </Button>
  )
}
