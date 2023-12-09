'use client'
import { Bell, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../../public/netflix_logo.svg'
import UserNav from './UserNav'

interface linkProps {
	name: string
	href: string
}

const links: linkProps[] = [
	{ name: 'Home', href: '/home' },
	{ name: 'Movies', href: '/home/movies' },
	{ name: 'Series', href: '/home/series' },
	{ name: 'Films', href: '/home/films' },
	{ name: 'Recently Added', href: '/home/recently' },
	{ name: 'My List', href: '/home/user/list' },
]

export default function Navbar() {
	const pathName = usePathname()

	return (
		<div className='w-full  mx-auto flex justify-between items-center px-5 sm:px-6 lg:px-8 py-5'>
			<div className='flex items-center'>
				<Link href='/home' className='w-36'>
					<Image src={Logo} alt='netflix logo' priority />
				</Link>
				<ul className='lg:flex gap-x-4 ml-10 hidden'>
					{links.map((link, idx) => (
						<div key={idx}>
							{pathName === link.href ? (
								<li>
									<Link
										href={link.href}
										className='text-white font-semibold underline text-base '
									>
										{link.name}
									</Link>
								</li>
							) : (
								<li>
									<Link
										href={link.href}
										className='text-gray-300 font-normal text-sm hover:text-white'
									>
										{link.name}
									</Link>
								</li>
							)}
						</div>
					))}
				</ul>
			</div>
			<div className='flex items-center gap-x-8'>
				<Search className='w-[20px] h-[20px] text-gray-300 cursor-pointer' />
				<Bell className='w-[20px] h-[20px] text-gray-300 cursor-pointer' />
				<UserNav />
			</div>
		</div>
	)
}
