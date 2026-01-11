import React from 'react'

interface ContentsProps {
	children: React.ReactNode
}

const contents = (props: ContentsProps) => {
	return (
		<>
			<main className="flex-1 flex items-center justify-center p-4 md:p-10 relative">
				<div className="game-panel">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-x-12 md:gap-y-16 w-full max-w-7xl justify-items-center">
						{props.children}
					</div>
				</div>
			</main>
		</>
	)
}

export default contents
