import Link from 'next/link'
import { TbListSearch } from 'react-icons/tb'

export const Header = () => {
  return (
    <header className='flex items-center justify-center gap-4 py-6 text-xl sticky top-0 z-9999 bg-app-background'>
      <Link
        href='/'
        className='flex items-center gap-1 border-2 border-gray-700 p-1 transition-all hover:underline hover:scale-105 '
      >
        Home
        <TbListSearch />
      </Link>

    </header>
  )
}
