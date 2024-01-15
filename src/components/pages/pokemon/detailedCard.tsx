import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'
import { BiTrendingDown } from 'react-icons/bi'
import { MdShield } from 'react-icons/md'
import type { PokemonType } from '../../../@types/pokemon'
import { getDamageRelations } from '../../../lib/queries'
import { useStatsPanelStore } from '../../../lib/stores/statsPanel'
import { toTitleCase } from '../../../lib/utils/toTitleCase'
import Card from '@material-ui/core/Card';
import { StatContainer } from '../../common/pokemonStats/statContainer'
import { CatchDifficulty } from './catchDifficulty'

type DetailedCardProps = {
  id: number
  name: string
  types: PokemonType[]
  category: string | undefined
  hp: number
  weight: number
  height: number
  attack: number
  defense: number
  speed: number
  specialAttack: number
  specialDefense: number
  difficultyLevelDisplayBar: number
}

export const DetailedCard = ({
  id,
  name,
  types,
  category,
  hp,
  weight,
  height,
  attack,
  defense,
  speed,
  specialAttack,
  specialDefense,
  difficultyLevelDisplayBar,
}: DetailedCardProps) => {
  const { } = useStatsPanelStore()

  const hasMoreThanOneType = types.length > 1

  const { data: damageRelationsData } = useQuery({
    queryKey: ['pokemon', 'damage', id],
    queryFn: async () => {
      const mainType = types.find((type) => type.slot === 1)

      if (mainType) {
        return getDamageRelations(mainType.url)
      }
    },
  })

  return (
    <Card className=' w-60'>

      <div className='relative flex w-full justify-center  gap-2'>
        <span className='absolute top-1  rounded-full bg-gray-700 px-2 text-sm font-bold text-white'>
          Id - {id.toString().padStart(3, '0')}
        </span>
      </div>
      <div className='flex w-full flex-col gap-1 bg-gray-200 p-5 h-full md:gap-3'>
        <div className='flex items-center justify-between gap-2 mt-1'>
          <p className='w-full text-lg font-extrabold leading-none'>
            {toTitleCase(name.replaceAll('-', ' '))}
          </p>
          {!hasMoreThanOneType && (
            <div
              key={types[0]?.name}
              className='h-min w-40 rounded-xl bg-gray-700 px-2 py-1 text-xs md:text-sm font-bold text-white'
            >
              Type: {toTitleCase(types[0]?.name ?? '')}
            </div>
          )}
        </div>
        {hasMoreThanOneType && (
          <div className='flex items-center gap-2'>
            Types:
            {types.map((type) => (
              <div
                key={type.name}
                className='h-min w-min rounded-xl bg-gray-700 px-2 py-1 text-xs md:text-sm font-bold text-white'
              >
                {toTitleCase(type.name)}
              </div>
            ))}
          </div>
        )}
        {(category ? (
          <span className='text-xs md:text-sm text-gray-500'>Category: {category}</span>
        ) : (
          <span className='text-xs md:text-sm text-gray-500'>
            Loading category...
          </span>
        ))}
        <span>Characterisctis</span>
        <div className='grid grid-cols-3 justify-between gap-1 text-xs md:text-sm md:gap-2'>
          {(
            <>
              <StatContainer value={hp} prefix='HP' />
              <StatContainer
                value={(weight * 0.1).toFixed(1)}
                prefix='W'
                sufix='kg'
              />
              <StatContainer
                value={(height * 0.1).toFixed(1)}
                prefix='H'
                sufix='m'
              />
            </>
          )}
          {(
            <>
              <StatContainer value={attack} prefix='Atk' />
              <StatContainer value={defense} prefix='Def' />
              <StatContainer value={speed} prefix='Spd' />
            </>
          )}
          {(
            <>
              <StatContainer value={specialAttack} prefix='SAtk' />
              <StatContainer value={specialDefense} prefix='SDef' />
            </>
          )}
        </div>

        {!!damageRelationsData?.resistances?.length && (
          <div>
            <span>Resistance</span>
            <div className='grid grid-cols-fit56 gap-1 text-xs md:text-sm md:gap-2'>
              {damageRelationsData ? (
                damageRelationsData.resistances.map((resistance) => (
                  <StatContainer
                    key={resistance}
                    value={toTitleCase(resistance)}
                    Icon={MdShield}
                  />
                ))
              ) : (
                <p className='text-gray-800'>Loading resistances...</p>
              )}
            </div>
          </div>
        )}

        {damageRelationsData?.weaknesses?.length && (
          <div>
            <span>Weakness</span>
            <div className='grid grid-cols-fit56 gap-1 text-xs md:text-sm md:gap-2'>
              {damageRelationsData ? (
                damageRelationsData.weaknesses.map((weakness) => (
                  <StatContainer
                    key={weakness}
                    value={toTitleCase(weakness)}
                    Icon={BiTrendingDown}
                  />
                ))
              ) : (
                <p className='text-gray-800'>Loading weaknesses...</p>
              )}
            </div>
          </div>
        )}
        {<CatchDifficulty barSize={difficultyLevelDisplayBar} />}
      </div>
    </Card >
  )
}
