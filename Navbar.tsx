
import { useState } from 'react';

const links = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'MENU', href: '#menu' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'VISIT', href: '#visit' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="slow-navbar">
      <a className="slow-logo" href="#home">
        SLOWDAY<span>.</span>
      </a>

      <nav className={isOpen ? 'slow-nav open' : 'slow-nav'} aria-label="主選單">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a className="slow-book" href="#reservation" onClick={() => setIsOpen(false)}>
          BOOK A TABLE ↗
        </a>
      </nav>

      <button
        className="slow-toggle"
        type="button"
        aria-label={isOpen ? '關閉選單' : '開啟選單'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </header>
  );
}
