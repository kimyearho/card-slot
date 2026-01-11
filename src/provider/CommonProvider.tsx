'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getUser } from '@/utils/supabase/auth'

interface AuthContextType {
	uid: string | null
}

const AuthUserContext = createContext<AuthContextType | undefined>(undefined)

export const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
	const [uid, setUid] = useState<string | null>(null)

	useEffect(() => {
		// 1. 마운트 시 서버 액션을 호출해서 uid를 가져옴
		const fetchUid = async () => {
			try {
				const { user } = await getUser()
				if (user) {
					setUid(user?.id)
				}
			} catch (error) {
				console.error('Failed to fetch UID:', error)
				setUid(null)
			}
		}
		fetchUid()
	}, [])

	return <AuthUserContext.Provider value={{ uid }}>{children}</AuthUserContext.Provider>
}

// 2. 컴포넌트에서 편리하게 쓰기 위한 커스텀 훅
export const useAuthUser = () => {
	const context = useContext(AuthUserContext)
	if (context === undefined) {
		throw new Error('useAuthUser는 AuthUserProvider 내부에서 사용해야 해!')
	}
	return context
}
