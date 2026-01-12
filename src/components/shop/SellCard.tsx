import { CardListProps } from '@/interface/ICard'
import Image from 'next/image'

const SellCard = (props: CardListProps) => {
	const cards = props.cardList ?? []

	return (
		<>
			<div className="h-195 overflow-y-auto p-4">
				<div className="grid grid-cols-[repeat(auto-fit,minmax(155px,1fr))] gap-4 justify-items-centerbg-[#ffffff0a]">
					{cards?.map((card) => {
						const imageClass = card.user_count <= 0 ? 'grayscale opacity-50' : ''
						const cardImage = (
							<Image
								src={`/images/char/${card.name}.png`}
								alt={card.name}
								width={250}
								height={240}
								style={{ width: '250px', height: '240px', objectFit: 'cover' }}
								className={imageClass}
							/>
						)
						return (
							<div key={card.id} className="relative">
								{cardImage}
								{card.user_count > 0 && (
									<>
										<div className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 bg-black/70 text-white text-base font-bold rounded-lg border border-white shadow-lg.">
											{card.user_count}
										</div>
										<div className="absolute -bottom-2 -right-2 flex items-center justify-center">🪙 {card.price}</div>
									</>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default SellCard
