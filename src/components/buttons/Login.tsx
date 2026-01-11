'use client'

import { createClient } from '@/utils/supabase/client'
import Button from '@/components/buttons/Button'

const LoginButton = () => {
	const supabase = createClient()

	const loginWithGoogle = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				// Next.js에서는 이 경로가 중요해! (아래 2단계에서 만들 거야)
				redirectTo: `${window.location.origin}/auth/callback`,
				queryParams: {
					prompt: 'select_account',
				},
			},
		})

		if (error) console.error('로그인 에러:', error.message)
	}

	return (
		<>
			<Button
				className="border-1 bg-blue-400 p-1 font-bold text-amber-50"
				text="구글 로그인"
				onClick={loginWithGoogle}
			></Button>
		</>
	)
}

export default LoginButton
