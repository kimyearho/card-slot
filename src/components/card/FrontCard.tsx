import Image from 'next/image'

const FrontCard = () => {
	return (
		<>
			<Image
				src="/images/char/card-cover-1.png"
				className="card-img block transform transition-transform duration-300 hover:scale-105"
				fill
				alt="card"
			/>
		</>
	)
}

export default FrontCard
