import { requireAuth } from '@/utils/supabase/auth'
import { getGachaLimit } from '@/app/actions/inventory'
import FrontCard from '@/components/card/FrontCard'

export default async function Home() {
	// 1. getUser()로 유저 정보 가져오기, 유저 정보가 없으면 메인으로 리다이렉트
	const user = await requireAuth()

	// 2. 일일 가챠 개수 조회
	const { data: gacha } = await getGachaLimit(user.id)

	return (
		<>
			{[...Array(8)].map((_, i) => (
				<div
					key={i}
					// 카드의 고정 크기를 유지하면서 그리드가 이를 감싸게 함
					className="w-45 h-65 md:w-55 md:h-80  border-white/20 rounded-xl bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform hover:scale-105"
				>
					<FrontCard />
				</div>
			))}
			가챠 개수: {gacha?.daily_count && gacha?.daily_count}
		</>
	)
}
