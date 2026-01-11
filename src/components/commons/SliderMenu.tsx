'use client'

import React, { memo } from 'react'
import LogoutButton from '@/components/buttons/Logout'
import Button from '@/components/buttons/Button'
import CardListMdoal from '@/components/modal/CardListMdoal'

interface MenuItem {
	isMenuOpen: boolean
	updateMenuOpen: (isOpen: boolean) => void
}

const SliderMenu = (props: MenuItem) => {
	const MENU_ITEMS = [
		{ label: '상점', icon: '💰', key: 'shop' },
		{ label: '전체 카드', icon: '🃏', key: 'allCard' },
		{ label: '컬렉션', icon: '🏆', key: 'collection' },
		{ label: '설정', icon: '⚙️', key: 'settings' },
	]

	const [isOpen, setIsOpen] = React.useState(false)

	const handleClick = (params: string) => {
		if (params === 'allCard') {
			setIsOpen(true)
		}
	}

	return (
		<>
			<div
				className={`fixed top-0 right-0 h-full w-80 bg-[#111] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
					props.isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex flex-col h-full p-6">
					{/* 메뉴 상단 (프로필 & 닫기) */}
					<div className="flex items-center justify-between mb-10">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/20">
								👤
							</div>
							<span className="font-bold">Benjamin</span>
						</div>
						<Button onClick={() => props.updateMenuOpen(false)} className="text-2xl text-white/50 hover:text-white">
							✕
						</Button>
					</div>

					{/* 메뉴 리스트 */}
					<nav className="flex flex-col gap-2">
						{MENU_ITEMS.map((item) => (
							<Button
								key={item.label}
								className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors text-left text-lg text-white/80 hover:text-white"
								onClick={() => handleClick(item.key)}
							>
								<span>{item.icon}</span>
								<span>{item.label}</span>
							</Button>
						))}
					</nav>

					{/* 하단 로그아웃 */}
					<div className="mt-auto border-t border-white/10 pt-6">
						<LogoutButton />
					</div>
				</div>
			</div>
			<CardListMdoal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	)
}

// 부모에서 다른 이벤트로 리랜더링이 발생했을때 굳이 다시 랜더링하지 않도록함.
export default memo(SliderMenu)
