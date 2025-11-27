import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Rafraîchir la session utilisateur
  const response = await updateSession(request)

  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = ['/compte', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Vérifier si l'utilisateur est authentifié
    const supabaseResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        headers: {
          Authorization: request.cookies.get('sb-access-token')?.value 
            ? `Bearer ${request.cookies.get('sb-access-token')?.value}` 
            : '',
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
      }
    )

    if (!supabaseResponse.ok) {
      // Rediriger vers la page de connexion si non authentifié
      return NextResponse.redirect(new URL('/auth/connexion', request.url))
    }

    // Pour les routes admin, vérifier le rôle
    if (request.nextUrl.pathname.startsWith('/admin')) {
      try {
        const userData = await supabaseResponse.json()
        // Implémenter la vérification du rôle admin ici si nécessaire
      } catch (error) {
        return NextResponse.redirect(new URL('/auth/connexion', request.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
