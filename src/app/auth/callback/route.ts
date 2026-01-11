// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')
	const next = searchParams.get('next') ?? '/service/games' // 이동할 경로

	console.log('code:', code)
	console.log('next:', next)

	if (code) {
		const supabase = await createClient()

		// 1. 코드를 세션으로 교환 (이때 로그인이 완료됨)
		const {
			data: { session },
			error: authError,
		} = await supabase.auth.exchangeCodeForSession(code)

		if (!authError && session) {
			const userId = session.user.id

			// 2. profiles 체크 및 생성 (Vue의 로직 그대로!)
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', userId)
				.single()

			if (profileError && profileError.code === 'PGRST116') {
				await supabase.from('profiles').insert({
					id: userId,
					is_admin: false,
				})
			}

			// 3. gacha_limits 체크 및 생성
			const { data: limit, error: limitError } = await supabase
				.from('gacha_limits')
				.select('*')
				.eq('user_id', userId)
				.single()

			if (limitError && limitError.code === 'PGRST116') {
				await supabase.from('gacha_limits').insert({
					user_id: userId,
					daily_count: 50,
					recharge_count: 0,
				})
			}

			// 모든 처리가 끝나면 지정된 페이지로 리다이렉트
			return NextResponse.redirect(`${origin}${next}`)
		}
	}

	// 에러 발생 시 로그인 페이지로
	return NextResponse.redirect(`${origin}/login`)
}
