'use client'

import { createClient } from '@/utils/supabase/client'
import Button from '@/components/buttons/Button'

const LogoutButton = () => {
	const client = createClient()

	const logout = async () => {
		const { error } = await client.auth.signOut()
		if (error) {
			console.error(error)
		} else {
			location.href = '/login'
		}
	}

	return (
		<>
			<Button className="border-1 bg-blue-400 p-1 font-bold text-amber-50" text="로그아웃" onClick={logout} />
		</>
	)
}

export default LogoutButton
