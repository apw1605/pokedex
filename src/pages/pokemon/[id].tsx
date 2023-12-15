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
    <>
      <Header />
      <div className='flex flex-col gap-2 px-2 md:px-10 lg:px-16 items-center pb-5 pt-2 md:pt-4'>
        <div className='flex gap-4 text-app-text md:gap-10 lg:gap-20'>
          <ImageCard
            imageUrl={`${defaultImageUrl}${image}`}
            id={pokemonData.id}
          />
          <div className='flex flex-col gap-2 w-full'>
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
        <div className='flex flex-col gap-2 md:gap-6 self-center sm:w-[85%] md:w-[65%] items-center w-full'>
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
    </>
  )
}

export default PokemonPage

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const id = String(context.params?.id) ?? ''
  return {
    props: { id },
  }
}
