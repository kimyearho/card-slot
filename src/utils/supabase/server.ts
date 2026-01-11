import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
	const cookieStore = await cookies()

	return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
				} catch {
					// 서버 컴포넌트에서 호출될 경우 setAll이 실패할 수 있어.
					// 하지만 미들웨어에서 실제 쿠키 업데이트를 처리해주면 괜찮아!
				}
			},
		},
	})
}
