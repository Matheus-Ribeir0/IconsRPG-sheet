'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ComicHeading } from '@/components/comic/comic-heading';
import { Home, Sparkles, FileText } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/generator', label: 'Gerador', icon: Sparkles },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-50">
      {/* Top bar with halftone */}
      <div className="bg-primary h-2" />
      
      <div className="bg-card border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={cn(
                'w-12 h-12 rounded-lg',
                'bg-primary text-primary-foreground',
                'border-3 border-foreground',
                'shadow-[3px_3px_0_0_#2f2f2e]',
                'flex items-center justify-center',
                'group-hover:shadow-[4px_4px_0_0_#2f2f2e]',
                'group-hover:-translate-y-0.5',
                'transition-all duration-200'
              )}>
                <FileText className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <ComicHeading level={4} className="leading-none">
                  Icons
                </ComicHeading>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Assembled Edition
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2',
                      'font-bold uppercase text-sm tracking-wide',
                      'border-3 border-foreground rounded-md',
                      'shadow-[3px_3px_0_0_#2f2f2e]',
                      'transition-all duration-200',
                      'hover:shadow-[4px_4px_0_0_#2f2f2e] hover:-translate-y-0.5',
                      'active:shadow-[1px_1px_0_0_#2f2f2e] active:translate-y-0.5',
                      isActive
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-card text-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Bottom accent */}
      <div className="bg-secondary h-1" />
    </header>
  );
}
