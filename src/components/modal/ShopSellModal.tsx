'use client'

import { Card } from '@/interface/ICard'
import { fetchOwnedCards } from '@/app/actions/inventory'
import { ModalProps } from '@/interface/IModal'
import { useAuthUser } from '@/provider/CommonProvider'
import { useQuery } from '@tanstack/react-query'
import Modal from '@/components/modal/Modal'
import SellCard from '@/components/shop/SellCard'
import React from 'react'

// 소유한 카드만 조회
const getOnwerList = async (uid: string): Promise<Array<Card>> => {
	const res = await fetchOwnedCards(uid)
	return res.data ?? []
}

// 상점 판매 모달
const ShopSellModal = (props: ModalProps) => {
	const { uid } = useAuthUser()
	const { data, isLoading } = useQuery({
		queryKey: ['cardsOnwer'],
		queryFn: () => getOnwerList(uid as string),
		enabled: !!uid, // uid가 있으면 실행
		placeholderData: [] as Card[], // 없으면 기본값
	})
	if (!props.isOpen) return null

	return (
		<>
			{!isLoading && (
				<Modal size={'2xl'} isOpen={props.isOpen} onClose={() => props.onClose(false)}>
					{isLoading ? (
						<div className="p-10 text-center text-white">로딩 중...</div>
					) : (
						<SellCard cardList={data ?? []} />
					)}
				</Modal>
			)}
		</>
	)
}

export default ShopSellModal
