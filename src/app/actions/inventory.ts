'use server'

import { createClient } from '@/utils/supabase/server'

export interface Card {
	grade: string
	id: string
	name: string
	owned: boolean
	price: number
	sort_order: number
	user_count: number
}

interface Gacha {
	daily_count: number
	recharge_count: number
}

type IResponse<T> =
	| { data: T } // 성공 시: data는 무조건 있고 error는 null
	| { data: null }

/**
 * 유저가 소유한 전체 카드 리스트를 조회한다.
 *
 * @param id 구글 사용자 식별 아이디
 */
export async function getAllCards(id: string): Promise<IResponse<Card[]>> {
	const client = await createClient()
	const { data } = await client.rpc('get_cards_with_counts', {
		uid: id,
		p_grade: null,
		owned_only: false,
	})
	return { data }
}

export async function fetchOwnedCards(id: string) {
	const client = await createClient()
	const { data } = await client.rpc('get_cards_with_counts', {
		uid: id,
		p_grade: null,
		owned_only: true,
	})
	return { data }
}

/**
 * 가챠 최대 개수 조회
 *
 * @param id 구글 사용자 식별 아이디
 */
export async function getGachaLimit(id: string): Promise<IResponse<Gacha>> {
	const client = await createClient()
	const { data } = await client.from('gacha_limits').select('daily_count, recharge_count').eq('user_id', id).single()
	return { data }
}
