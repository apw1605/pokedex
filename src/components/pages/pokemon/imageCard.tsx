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
    <Card className=' w-40 h-40' >
      <Card >
        <Image
          src={imageUrl}
          width='210'
          height='120'
          alt=''
          className='scale-100'
          priority
        />
      </Card>

    </Card>
  )
}
