'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import GoogleIcon from '../../public/google.svg'

export const GoogleSignInButton = () => {
	return (
		<Button onClick={() => signIn('google')} variant='outline' size='icon'>
			<Image src={GoogleIcon} alt='google icon' className='w-7 h-7' />
		</Button>
	)
}
