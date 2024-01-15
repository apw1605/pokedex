import { useState } from 'react'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { Header } from '../../components/common/header'
import { getPokemon } from '../../lib/queries'
import { defaultImageUrlState } from '../../lib/atoms/defaultImageUrl'
import { Evolutions } from '../../components/pages/pokemon/evolutions'
import { Abilities } from '../../components/pages/pokemon/abilities'
import { StatsControllerPanel } from '../../components/pages/pokemon/statsControllerPanel'
import { useStatsPanelStore } from '../../lib/stores/statsPanel'
import { DetailedCard } from '../../components/pages/pokemon/detailedCard'
import { ImageCard } from '../../components/pages/pokemon/imageCard'

//this page could be done using getStaticPaths
//for the purpose of this test I'll use tanstack to load data instead
const PokemonPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [category, setCategory] = useState<string>()
  const { abilitiesActive, evolutionsActive } = useStatsPanelStore()
  const [defaultImageUrl] = useAtom(defaultImageUrlState)
  const {
    data: pokemonData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(`pokemon/${id}`),
  })

  //main query
  if (isError || isLoading) {
    return (
      <>
        <Header />
        <p className='w-full text-center text-lg font-bold pt-10'>
          {isError ? 'Invalid Pokémon ID' : 'Loading pokémon data...'}
        </p>
      </>
    )
  }

  const { image, stats, weight, height } = pokemonData

  const speed = stats.find((stat) => stat.stat.name === 'speed')?.base_stat ?? 0
  const defense =
    stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? 0
  const attack =
    stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? 0
  const hp = stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0

  const calculatedDifficultyLevel =
    (speed * 2 + defense * 1.5 + attack * 1.25 + hp * 0.75) / 500 - 0.1
  const normalizedDifficultyLevel =
    calculatedDifficultyLevel > 0.95 ? 0.95 : calculatedDifficultyLevel
  const difficultyLevelDisplayBar = 100 - normalizedDifficultyLevel * 100

  return (
    <div className=' place-self-center '>
      <Header />
      <div className='grid '>
        <div className='flex flex-row gap-1 ml-14'>
          <ImageCard
            imageUrl={`${defaultImageUrl}${image}`}
            id={pokemonData.id}
          />
          <div className='flex flex-col mr-2 gap-2'>
            <DetailedCard
              id={pokemonData.id}
              name={pokemonData.name}
              types={pokemonData.types}
              category={category}
              hp={hp}
              weight={weight}
              height={height}
              attack={attack}
              defense={defense}
              speed={speed}
              specialAttack={
                stats.find((stat) => stat.stat.name === 'special-attack')
                  ?.base_stat ?? 0
              }
              specialDefense={
                stats.find((stat) => stat.stat.name === 'special-defense')
                  ?.base_stat ?? 0
              }
              difficultyLevelDisplayBar={difficultyLevelDisplayBar}
            />
            <StatsControllerPanel />
          </div>
        </div>
        <div className='ml-14 ' >
          {abilitiesActive && (
            <Abilities id={pokemonData.id} abilities={pokemonData.abilities} />
          )}

          {evolutionsActive && (
            <div>
              <Evolutions
                url={pokemonData.species.url}
                id={pokemonData.id}
                setCategory={setCategory}
              />
            </div>
          )}
        </div>
      </div >
    </div>
  )
}

export default PokemonPage

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const id = String(context.params?.id) ?? ''
  return {
    props: { id },
  }
}
