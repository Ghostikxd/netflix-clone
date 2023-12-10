import { MovieCard } from '@/app/components/MovieCard'
import { authOptions } from '@/app/utils/auth'
import prisma from '@/app/utils/db'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

async function getData(category: string, userId: string) {
	switch (category) {
		case 'series': {
			const data = await prisma.movie.findMany({
				where: {
					category: 'show',
				},
				select: {
					age: true,
					duration: true,
					id: true,
					title: true,
					release: true,
					imageString: true,
					overview: true,
					youtubeString: true,
					WatchLists: {
						where: {
							userId: userId,
						},
					},
				},
			})
			return data
		}
		case 'movies': {
			const data = await prisma.movie.findMany({
				where: { category: 'movie' },
				select: {
					age: true,
					duration: true,
					id: true,
					title: true,
					release: true,
					imageString: true,
					overview: true,
					youtubeString: true,
					WatchLists: {
						where: {
							userId: userId,
						},
					},
				},
			})
			return data
		}
		case 'films': {
			const data = await prisma.movie.findMany({
				where: { category: 'film' },
				select: {
					age: true,
					duration: true,
					id: true,
					title: true,
					release: true,
					imageString: true,
					overview: true,
					youtubeString: true,
					WatchLists: {
						where: {
							userId: userId,
						},
					},
				},
			})
			return data
		}
		case 'recently': {
			const data = await prisma.movie.findMany({
				select: {
					age: true,
					duration: true,
					id: true,
					title: true,
					release: true,
					imageString: true,
					overview: true,
					youtubeString: true,
					WatchLists: {
						where: {
							userId: userId,
						},
					},
				},
				orderBy: {
					release: 'desc',
				},
				take: 4,
			})

			return data
		}
		default: {
			throw new Error()
		}
	}
}

export default async function CategoryPage({
	params,
}: {
	params: { genre: string }
}) {
	const session = await getServerSession(authOptions)
	const data = await getData(params.genre, session?.user?.email as string)
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 mb-12 gap-6'>
			{data.map(movie => (
				<div key={movie.id} className='relative h-[400px] '>
					<Image
						src={movie.imageString}
						alt='movie'
						width={500}
						height={400}
						className='rounded-sm absolute w-full h-full object-cover'
					/>
					<div className='h-[390px] relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100 '>
						<div className='flex justify-center items-center bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg '>
							<Image
								src={movie.imageString}
								alt='movie'
								width={800}
								height={800}
								className='absolute w-full h-full -z-10 rounded-lg object-cover'
							/>
							<MovieCard
								key={movie.id}
								age={movie.age}
								movieId={movie.id}
								overview={movie.overview}
								time={movie.duration}
								title={movie.title}
								watchListId={movie.WatchLists[0]?.id}
								watchList={movie.WatchLists.length > 0 ? true : false}
								year={movie.age}
								youtubeUrl={movie.youtubeString}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
