'use client'

import { Button } from '@/components/ui/button'
import { InfoIcon, PlayCircle } from 'lucide-react'
import { useState } from 'react'
import PlayVideoModal from './PlayVideoModal'

interface iAppProps {
	overview: string
	youtubeUrl: string
	id: number
	age: number
	title: string
	release: number
	duration: number
}

export default function MovieButtons({
	age,
	duration,
	id,
	overview,
	release,
	title,
	youtubeUrl,
}: iAppProps) {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				className='hover:bg-red-800 text-base font-medium'
			>
				<PlayCircle className='mr-2 h-6 w-6' />
				Play
			</Button>
			<Button
				onClick={() => setOpen(true)}
				className='hover:bg-red-800 text-base font-medium bg-red-600/75'
			>
				<InfoIcon className='mr-2 h-6 w-6' /> Learn More
			</Button>
			<PlayVideoModal
				state={open}
				changeState={setOpen}
				age={age}
				duration={duration}
				overview={overview}
				release={release}
				title={title}
				youtubeUrl={youtubeUrl}
				key={id}
			/>
		</>
	)
}
