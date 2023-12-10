'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { authOptions } from './utils/auth'
import prisma from './utils/db'

export async function addToWatchList(formData: FormData) {
	'use server'

	const movieId = formData.get('movieId')
	const pathName = formData.get('pathName') as string
	const session = await getServerSession(authOptions)

	const data = await prisma.watchList.create({
		data: {
			userId: session?.user?.email as string,
			movieId: Number(movieId),
		},
	})

	revalidatePath(pathName)
}

export async function removeFromWatchList(formData: FormData) {
	'use server'

	const watchListId = formData.get('watchListId') as string
	const pathName = formData.get('pathName') as string

	const data = await prisma.watchList.delete({
		where: {
			id: watchListId,
		},
	})

	revalidatePath(pathName)
}
