import Image from 'next/image'
import { useAtom } from 'jotai'
import { defaultImageUrlState } from '../../../../lib/atoms/defaultImageUrl'

type SmallCardProps = {
  name: string
  image: string
}

export const SmallCard = ({ name, image }: SmallCardProps) => {
  const [defaultImageUrl] = useAtom(defaultImageUrlState)
  console.log(defaultImageUrl)
  return (
    <>
      <div
        className={`flex h-24 w-24  flex-col items-center justify-center rounded-lg border-2 border-gray-700 bg-gray-50 text-xl text-gray-500 leading-none overflow-visible shadow-2xl hover:scale-105 transition-all`}
      >
        <Image
          src={`${defaultImageUrl}${image}`}
          width='60'
          height='60'
          alt=''
          className=''
        />

        <span className='w-full text-center font-start text-[8px]  shrink-0 h-1/3'>
          {name}
        </span>
      </div>
    </>
  )
}
