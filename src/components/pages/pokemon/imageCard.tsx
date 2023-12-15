import Image from 'next/image'
import Card from '@material-ui/core/Card';

type ImageCardProps = {
  imageUrl: string
  id: number
}

export const ImageCard = ({
  imageUrl,
  id,
}: ImageCardProps) => {

  return (
    <Card className='h-1/6 w-28 ' >
      <Card >
        <Image
          src={imageUrl}
          width='80'
          height='80'
          alt=''
          className='scale-100'
          priority
        />
        <span className='absolute top-3 right-3 rounded-full bg-gray-700 px-2 text-sm font-bold text-white'>
          {id.toString().padStart(3, '0')}
        </span>
      </Card>

    </Card>
  )
}
