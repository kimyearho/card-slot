export interface Card {
	grade: string
	id: string
	name: string
	owned: boolean
	price: number
	sort_order: number
	user_count: number
}

export interface CardListProps {
	cardList: Array<Card> | null
}
