import Image from 'next/image'
import { ReactNode } from 'react'
import BackgroundImage from '../../public/login_background.jpg'
import Logo from '../../public/netflix_logo.svg'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='relative flex w-screen h-screen	 flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Image
				src={BackgroundImage}
				alt='background image'
				className='hidden sm:flex sm:object-cover -z-10 brightness-50'
				priority
				fill
			/>

			<Image
				src={Logo}
				alt='logo'
				width={120}
				height={120}
				priority
				className='absolute left-4 t-4  md:left-10 md:top-6'
			/>

			{children}
		</div>
	)
}

export default AuthLayout
