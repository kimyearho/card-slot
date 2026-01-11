'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const getUser = async () => {
	const supabase = await createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()
	return { user, error }
}

/**
 * 인증이 반드시 필요한 페이지에서 사용 (유저가 없으면 바로 리다이렉트)
 */
export async function requireAuth() {
	const { user, error } = await getUser()

	if (error || !user) {
		redirect('/login')
	}

	return user
}
