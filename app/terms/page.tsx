import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Vitality Score',
  description:
    'Terms governing the use of the Vitality Score quiz operated by T-Shots.',
};

const LAST_UPDATED = 'May 14, 2026';

export default function TermsPage() {
  return (
    <main className="legal-shell">
      <article className="legal-article">
        <header className="legal-header">
          <p className="legal-eyebrow">Vitality Score</p>
          <h1>Terms of Use</h1>
          <p className="legal-meta">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="legal-section">
          <h2>1. Acceptance of these Terms</h2>
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and
            use of the Vitality Score website operated by T-Shots
            (&ldquo;<strong>T-Shots</strong>,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; &ldquo;our&rdquo;), including any quiz, score
            result, or related feature (the &ldquo;Site&rdquo;). By using the
            Site, you agree to these Terms. If you do not agree, do not use the
            Site.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use the Site. By using the
            Site you represent that you meet this requirement and that the
            information you submit is your own.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. The Site is not medical advice</h2>
          <p>
            The Vitality Score is a wellness self-assessment intended for
            general informational and educational purposes only. It is{' '}
            <strong>
              not a medical device, not a diagnosis, and not a substitute for
              professional medical advice, examination, treatment, or
              prescription
            </strong>
            . Results are based solely on your self-reported answers and have
            not been validated against any clinical reference standard. Do not
            disregard professional medical advice or delay seeking it because
            of anything you read on the Site. If you may be experiencing a
            medical emergency, call 911 or your local emergency number.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. How we handle your data</h2>
          <p>
            Our collection and use of the information you submit, including the
            quiz responses and your email address, is governed by our{' '}
            <Link href="/privacy">Privacy Policy and Consumer Health Data
            Privacy Notice</Link>, which is incorporated into these Terms by
            reference. You must read and consent to that Notice in order to
            submit the quiz.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Submit information that is not your own, or impersonate any
              person.
            </li>
            <li>
              Use automated means (bots, scrapers, scripts) to access or submit
              to the Site.
            </li>
            <li>
              Attempt to interfere with, probe, or circumvent the Site&rsquo;s
              security or operation.
            </li>
            <li>
              Use the Site to harass, abuse, defame, or harm any person, or to
              transmit unlawful content.
            </li>
            <li>
              Reproduce, redistribute, or commercially exploit any part of the
              Site without our prior written consent.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Intellectual property</h2>
          <p>
            The Site, the Vitality Score name and rubric, the design of the
            quiz, and all related content are owned by T-Shots and protected by
            United States and international intellectual property laws.
            Nothing in these Terms grants you any license to our trademarks,
            copyrights, or other intellectual property except the limited right
            to use the Site as expressly permitted.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Disclaimer of warranties</h2>
          <p>
            THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
            AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS,
            IMPLIED, STATUTORY, OR OTHERWISE. TO THE FULLEST EXTENT PERMITTED
            BY LAW, T-SHOTS DISCLAIMS ALL WARRANTIES INCLUDING MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY
            WARRANTY ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. WE DO
            NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR
            ERROR-FREE, OR THAT THE VITALITY SCORE OR ANY OUTPUT WILL BE
            ACCURATE OR CLINICALLY MEANINGFUL.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, T-SHOTS AND ITS AFFILIATES,
            OFFICERS, EMPLOYEES, AGENTS, AND SERVICE PROVIDERS WILL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            PUNITIVE, OR EXEMPLARY DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA,
            GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN
            CONNECTION WITH THESE TERMS OR THE SITE.
          </p>
          <p>
            BECAUSE THE SITE IS OFFERED TO YOU FREE OF CHARGE, OUR TOTAL
            AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR
            RELATING TO THE SITE WILL NOT EXCEED <strong>ONE U.S. DOLLAR
            ($1.00)</strong>. THE FOREGOING LIMITATIONS APPLY EVEN IF A REMEDY
            FAILS OF ITS ESSENTIAL PURPOSE AND REGARDLESS OF THE FORM OF
            ACTION.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless T-Shots and its
            affiliates from and against any and all claims, damages,
            liabilities, costs, and expenses (including reasonable
            attorneys&rsquo; fees) arising out of or related to your use of the
            Site, your violation of these Terms, or your violation of any
            third-party right.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your access to the Site at any time,
            with or without cause and with or without notice. The provisions of
            these Terms that by their nature should survive termination
            (including Sections 4 through 12) will survive.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Dispute resolution and arbitration</h2>
          <p>
            <strong>Please read this Section carefully.</strong> Any dispute
            arising out of or relating to these Terms or the Site will be
            resolved by binding individual arbitration administered by the
            American Arbitration Association under its Consumer Arbitration
            Rules. You and T-Shots each waive the right to a jury trial and the
            right to participate in any class or representative action. The
            seat of arbitration will be Orange County, California, unless
            applicable law requires otherwise.
          </p>
          <p>
            Notwithstanding the foregoing, either party may bring an
            individual action in small-claims court, and you retain any
            non-waivable statutory rights under the laws of your state of
            residence (including, where applicable, the private right of action
            under Washington&rsquo;s My Health My Data Act).
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of California,
            without regard to its conflict-of-laws principles, except that
            mandatory consumer protection and health-data laws of your state
            of residence will apply where they would otherwise be displaced.
          </p>
        </section>

        <section className="legal-section">
          <h2>13. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. We will indicate the
            &ldquo;Last updated&rdquo; date at the top of this page. Continued
            use of the Site after we post changes constitutes your acceptance
            of the revised Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>14. Contact</h2>
          <p>
            <strong>T-Shots &mdash; Legal Team</strong>
            <br />
            16460 Bake Pkwy.
            <br />
            Irvine, CA 92618
            <br />
            Email:{' '}
            <a href="mailto:team@drvigor.com">team@drvigor.com</a>
          </p>
        </section>

        <footer className="legal-footer">
          <Link href="/">Return to Vitality Score</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </footer>
      </article>
    </main>
  );
}
