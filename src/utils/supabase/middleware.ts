import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
	// 1. 기본 응답 객체 생성
	// 우선 요청(request)을 다음 단계(다음 미들웨어나 실제 페이지)로 전달할 기본 응답 객체를 만듭니다.
	let supabaseResponse = NextResponse.next({
		request,
	})

	// 2. Supabase 서버 클라이언트 초기화
	const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		cookies: {
			// [getAll] 브라우저에서 보낸 쿠키를 Supabase SDK가 읽을 수 있도록 전달합니다.
			getAll() {
				return request.cookies.getAll()
			},
			// [setAll] Supabase SDK가 세션 갱신 등을 위해 쿠키를 설정해야 할 때 호출됩니다.
			setAll(cookiesToSet) {
				// A. 현재 요청(request) 객체에 쿠키를 반영합니다.
				// (미들웨어 이후 단계에서 갱신된 쿠키를 바로 쓸 수 있게 함)
				cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))

				// B. 응답(response) 객체를 새로 생성하거나 갱신합니다.
				supabaseResponse = NextResponse.next({
					request,
				})

				// C. 실제로 브라우저(클라이언트)에 저장될 쿠키를 응답 헤더에 설정합니다.
				// 이 과정이 있어야 로그인이 유지되거나 토큰이 자동 갱신됩니다.
				cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
			},
		},
	})

	// 유저 정보 확인 (Nuxt의 getSession 역할)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const url = request.nextUrl.clone()

	// 1) 세션 없고, 허용된 페이지가 아니라면 → 로그인으로 (Nuxt 로직과 동일)
	const isAuthPage =
		url.pathname.startsWith('/login') ||
		url.pathname.startsWith('/auth/callback') ||
		url.pathname.startsWith('/sample/sell')

	if (!user && !isAuthPage) {
		url.pathname = '/login'
		return NextResponse.redirect(url)
	}

	// 2) 세션 있고, 로그인/콜백 페이지에 있다면 → 서비스 메인으로
	if (user && (url.pathname === '/login' || url.pathname === '/auth/callback')) {
		url.pathname = '/service/games'
		return NextResponse.redirect(url)
	}

	return supabaseResponse
}
