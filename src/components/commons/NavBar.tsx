'use client'

import { useState } from 'react'
import Button from '@/components/buttons/Button'
import SliderMenu from '@/components/commons/SliderMenu'

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	return (
		<>
			<header className="relative z-10 flex items-center justify-between p-4  bg-black">
				<div>PROJECT-CARD-SPIN-GACHA</div>
				<div className="flex-1 flex justify-center mr-30">
					<div className="flex items-center gap-6 text-xl">
						<div className="flex items-center gap-2">
							<span className="text-yellow-400">🪙 </span>
							<span>0</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-blue-400">💎 </span>
							<span>0</span>
						</div>
					</div>
				</div>
				<Button text={''} onClick={() => setIsMenuOpen(true)}>
					<div className="w-6 h-0.5 bg-white mb-1.5" />
					<div className="w-6 h-0.5 bg-white mb-1.5" />
					<div className="w-6 h-0.5 bg-white" />
				</Button>
			</header>

			{/* 배경 오버레이 (메뉴 열렸을 때 화면 어둡게) */}
			<div
				className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
					isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsMenuOpen(false)} // 배경 클릭 시 닫기
			/>

			<SliderMenu isMenuOpen={isMenuOpen} updateMenuOpen={setIsMenuOpen} />
		</>
	)
}

export default NavBar
