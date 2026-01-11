'use client'

import React, { memo } from 'react'
import Modal from '@/components/modal/Modal'
import { useAuthUser } from '@/provider/CommonProvider'
import { Card, getAllCards } from '@/app/actions/inventory'
import { useQuery } from '@tanstack/react-query'
import CardList from '@/components/card/CardList'

interface ModalProps {
	isOpen: boolean
	onClose: (isOpen: boolean) => void
}

const fetchAllCards = async (uid: string): Promise<Array<Card>> => {
	const res = await getAllCards(uid)
	return res.data ?? []
}

const CardListMdoal = (props: ModalProps) => {
	const { uid } = useAuthUser()

	const { data, isLoading } = useQuery({
		queryKey: ['cardsAll'],
		queryFn: () => fetchAllCards(uid as string),
		enabled: !!uid, // uid가 있으면 실행 (null이면 실행안함)
		placeholderData: [] as Card[], // 빈값
	})

	return (
		<>
			<Modal size={'2xl'} isOpen={props.isOpen} onClose={() => props.onClose(false)}>
				<CardList cardList={data ?? []} />
			</Modal>
		</>
	)
}

export default memo(CardListMdoal)
