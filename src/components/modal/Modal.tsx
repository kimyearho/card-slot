import React from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	// 사이즈 옵션 추가
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
	// 모달이 닫혀있으면 아무것도 렌더링하지 않음
	if (!isOpen) return null

	// 사이즈별로 Tailwind 클래스 매핑
	const sizeClasses = {
		sm: 'max-w-sm', // 384px
		md: 'max-w-md', // 448px
		lg: 'max-w-2xl', // 672px
		xl: 'max-w-4xl', // 896px
		'2xl': 'max-w-7xl', // 1280px (xl와 full 사이의 넉넉한 사이즈!)
		full: 'max-w-[95vw]', // 거의 전체 화면
	}

	return (
		// 1. 전체 화면을 덮는 고정(fixed) 컨테이너
		<div className="fixed inset-0 z-100 flex items-center justify-center p-4">
			{/* 2. 배경 오버레이: 배경을 어둡게 하고 블러 처리 */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
				onClick={onClose} // 배경 클릭 시 닫기
			/>

			{/* 3. 모달 실제 콘텐츠 박스 */}
			<div
				className={`relative w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/10 p-6 shadow-2xl transition-all`}
			>
				{/* 헤더 영역 */}
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-xl font-bold text-white">{title || '알림'}</h3>
					<button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-2xl">
						✕
					</button>
				</div>

				{/* 본문 영역 */}
				<div className="text-white/80 leading-relaxed mb-6">{children}</div>

				{/* 하단 버튼 영역 (Flex 사용!) */}
				<div className="flex justify-end gap-3">
					<button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
						취소
					</button>
					<button
						onClick={() => {
							onClose()
						}}
						className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold transition-colors"
					>
						확인
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
