import Link from 'next/link'
import { BasicCard } from '../basic'

type PokedexCardProps = {
  id: number
  name: string
  image: string
}

export const PokedexCard = ({ id, name, image }: PokedexCardProps) => {
  return (
    <div className='relative'>
      <Link href={`/pokemon/${id}`} key={id}>
        <BasicCard name={name} image={image} />
      </Link>
    </div>
  )
}
