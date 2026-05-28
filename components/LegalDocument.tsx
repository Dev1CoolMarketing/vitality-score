import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

type LegalFact = {
  label: string;
  value: string;
};

type LegalLink = {
  href: string;
  label: string;
};

type LegalTocItem = {
  href: string;
  label: string;
};

type LegalDocumentProps = {
  accent: 'privacy' | 'terms';
  children: ReactNode;
  description: string;
  eyebrow: string;
  facts: LegalFact[];
  footerLinks: LegalLink[];
  lastUpdated: string;
  title: string;
  toc?: LegalTocItem[];
};

export default function LegalDocument({
  accent,
  children,
  description,
  eyebrow,
  facts,
  footerLinks,
  lastUpdated,
  title,
  toc = [],
}: LegalDocumentProps) {
  return (
    <main className={`legal-shell legal-shell--${accent}`}>
      <article className="legal-article fade-up-panel">
        <header className="legal-header">
          <div className="legal-topbar">
            <Link className="legal-back-link" href="/">
              <ArrowLeft size={16} />
              Return to Vitality Score
            </Link>
            <span className="legal-status-chip">T-Shots legal</span>
          </div>

          <div className="legal-hero">
            <div className="legal-hero-copy">
              <p className="legal-eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="legal-intro">{description}</p>
            </div>

            <div className="legal-meta-card">
              <span className="legal-meta-label">Last updated</span>
              <p className="legal-meta">{lastUpdated}</p>
            </div>
          </div>

          <div className="legal-fact-grid">
            {facts.map((fact) => (
              <div className="legal-fact-card" key={fact.label}>
                <p className="legal-fact-label">{fact.label}</p>
                <p className="legal-fact-value">{fact.value}</p>
              </div>
            ))}
          </div>

          {toc.length > 0 ? (
            <nav className="legal-toc" aria-label="Table of contents">
              {toc.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}
        </header>

        <div className="legal-content">{children}</div>

        <footer className="legal-footer">
          {footerLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </footer>
      </article>
    </main>
  );
}
