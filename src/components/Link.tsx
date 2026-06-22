import type { MouseEvent, ReactNode } from 'react'

export default function Link({ href, children, className = '', onClick }: { href: string, children: ReactNode, className?: string, onClick?: () => void }) {
  const go = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/')) { event.preventDefault(); history.pushState({}, '', href); window.dispatchEvent(new Event('app:navigate')) }
    onClick?.()
  }
  return <a href={href} className={className} onClick={go}>{children}</a>
}
