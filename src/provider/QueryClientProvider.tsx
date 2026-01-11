'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProviders({ children }: { children: React.ReactNode }) {
	// useState를 써야 페이지 전환 시 QueryClient 인스턴스가 유지돼!
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1분간은 신선한 데이터로 간주
					},
				},
			}),
	)

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
