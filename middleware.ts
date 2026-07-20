export const config = {
  // Only the root path needs special handling — every other path is
  // already resolved correctly by the rewrites in vercel.json.
  matcher: '/',
}

/**
 * Serves the Never Again landing page at the root of neveragainchallenge.com
 * (and www.), while keeping the CrossFit Impulso site at every other domain.
 *
 * Middleware runs before the filesystem, which is why this can override the
 * root index.html that vercel.json rewrites cannot.
 */
export default function middleware(request: Request) {
  const host = (request.headers.get('host') || '').toLowerCase()

  if (host.endsWith('neveragainchallenge.com')) {
    const target = new URL('/never-again/index.html', request.url)
    return new Response(null, {
      headers: { 'x-middleware-rewrite': target.toString() },
    })
  }

  // Anything else continues to the normal site.
  return undefined
}
