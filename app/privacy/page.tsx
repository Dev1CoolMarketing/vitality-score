import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vitality Score',
  description:
    'How T-Shots collects, uses, and protects information submitted through the Vitality Score quiz, including our Washington Consumer Health Data Privacy Notice.',
};

const LAST_UPDATED = 'May 14, 2026';

export default function PrivacyPage() {
  return (
    <main className="legal-shell">
      <article className="legal-article">
        <header className="legal-header">
          <p className="legal-eyebrow">Vitality Score</p>
          <h1>Privacy Policy &amp; Consumer Health Data Privacy Notice</h1>
          <p className="legal-meta">Last updated: {LAST_UPDATED}</p>
          <nav className="legal-toc" aria-label="Table of contents">
            <a href="#chd-notice">Consumer Health Data Privacy Notice</a>
            <a href="#policy">General Privacy Policy</a>
            <a href="#rights">Your Rights</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section id="chd-notice" className="legal-section legal-section--featured">
          <h2>Consumer Health Data Privacy Notice</h2>
          <p>
            This Notice is published under Washington&rsquo;s My Health My Data
            Act (RCW 19.373) and similar laws in Nevada and Connecticut. It
            describes how T-Shots (&ldquo;<strong>T-Shots</strong>,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles &ldquo;consumer health
            data&rdquo; collected through the Vitality Score quiz at this
            website (the &ldquo;Site&rdquo;).
          </p>

          <h3>1. Categories of consumer health data we collect</h3>
          <ul>
            <li>
              <strong>Self-rated vitality metrics</strong> — your numeric (0&ndash;10)
              responses to ten quiz sliders covering sexual function (erection
              strength, morning erections, libido, sexual thoughts), mood
              stability, energy and motivation, strength and endurance,
              concentration, body composition, and sleep quality.
            </li>
            <li>
              <strong>Email address</strong> you provide on the final step so we
              can email you your score.
            </li>
            <li>
              <strong>Consent record</strong> — timestamp, IP address, browser
              user-agent string, and the version of the consent text you
              accepted. Kept so we can demonstrate informed consent.
            </li>
            <li>
              <strong>Computed Vitality Score</strong> derived from your
              answers.
            </li>
          </ul>

          <h3>2. Sources of the data</h3>
          <p>
            We collect this data directly from you when you complete the quiz
            and submit it. We do not buy, license, or receive consumer health
            data about you from any other source. We do not use third-party
            advertising trackers (no Meta Pixel, Google Analytics, or similar)
            on this Site.
          </p>

          <h3>3. Purposes for which the data is collected and used</h3>
          <ul>
            <li>To compute your Vitality Score and email you the result.</li>
            <li>
              To save the result so that, if you later create a T-Shots account
              using the same email address, your pre-signup score can be linked
              to that account during onboarding.
            </li>
            <li>
              To maintain audit and consent records as required by applicable
              law.
            </li>
            <li>To detect, prevent, and respond to abuse or security events.</li>
          </ul>
          <p>
            We do <strong>not</strong> use your consumer health data for
            third-party advertising, profile-building, or to train any machine
            learning model. We do not use it to make automated decisions about
            you.
          </p>

          <h3>4. Categories of consumer health data shared, and with whom</h3>
          <p>
            We do <strong>not sell</strong> your consumer health data. We do
            not share it with advertisers, data brokers, or marketing partners.
            The only third parties that process consumer health data on our
            behalf are infrastructure sub-processors operating under contract:
          </p>
          <ul>
            <li>
              <strong>Supabase, Inc.</strong> &mdash; managed PostgreSQL hosting
              for our database.
            </li>
            <li>
              <strong>Railway Corp.</strong> &mdash; runtime hosting for our
              backend API.
            </li>
            <li>
              <strong>Vercel Inc.</strong> &mdash; hosting for this Site.
            </li>
            <li>
              <strong>Resend, Inc.</strong> and/or <strong>Google LLC (Gmail
              SMTP)</strong> &mdash; transactional email delivery, used only to
              email you your score.
            </li>
          </ul>
          <p>
            We may disclose data when required by law, valid legal process, or
            to protect rights, safety, or property. We will tell you about a
            legal demand for your data unless prohibited from doing so.
          </p>

          <h3>5. How long we keep the data</h3>
          <p>
            If you do not create or link a T-Shots account, we will
            automatically delete your Vitality Score lead record (including
            email, scores, and consent metadata) within <strong>30
            days</strong> of submission. If you do link the record to a T-Shots
            account, it is retained under the T-Shots app&rsquo;s privacy
            terms and you may delete it at any time from inside the T-Shots
            app.
          </p>

          <h3>6. Your rights under Washington, Nevada, and Connecticut law</h3>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Confirm</strong> whether we are processing your consumer
              health data and access a copy of it.
            </li>
            <li>
              <strong>Withdraw consent</strong> to our collection and processing
              of your consumer health data at any time.
            </li>
            <li>
              <strong>Request deletion</strong> of your consumer health data.
              We will delete it and direct our sub-processors to do the same.
            </li>
            <li>
              <strong>Appeal</strong> our denial of any rights request. If we
              deny a request, you may appeal in writing; we will respond within
              forty-five (45) days. If we deny the appeal, Washington and
              Connecticut residents may contact their state Attorney General.
            </li>
          </ul>
          <p>
            To exercise these rights, email{' '}
            <a href="mailto:team@drvigor.com">team@drvigor.com</a> from the
            email address you used in the quiz, or write to us at the address
            in the Contact section below. We may ask you to confirm a code we
            send to your email to authenticate the request.
          </p>

          <h3>7. Geofencing</h3>
          <p>
            We do not use geofencing of any kind, and specifically do not
            geofence within 2,000 feet of any healthcare facility, as required
            by RCW 19.373.030.
          </p>

          <h3>8. Changes to this Notice</h3>
          <p>
            We will update this Notice when our practices change. We will note
            the &ldquo;Last updated&rdquo; date at the top. If changes are
            material, we will obtain renewed consent before applying them to
            previously collected data.
          </p>
        </section>

        <section id="policy" className="legal-section">
          <h2>General Privacy Policy</h2>
          <p>
            This Privacy Policy applies to the Vitality Score website at
            vitality-score.t-shots.com and any associated subdomains operated
            by T-Shots. It complements, and where required by Washington,
            Nevada, or Connecticut law is supplemented by, the Consumer Health
            Data Privacy Notice above.
          </p>

          <h3>What we collect</h3>
          <ul>
            <li>
              <strong>Quiz responses and email</strong> &mdash; described in the
              Notice above.
            </li>
            <li>
              <strong>Server log data</strong> &mdash; standard web request
              metadata (IP, user-agent, request path, timestamp) generated by
              our hosting and observability providers. We do not associate
              these logs with named individuals beyond what is necessary for
              security and abuse prevention.
            </li>
            <li>
              <strong>Cookies</strong> &mdash; the Site does not use marketing
              or analytics cookies. We use only strictly-necessary cookies
              required for the Site to function.
            </li>
          </ul>

          <h3>How we use it</h3>
          <p>
            The purposes set out in the Notice above are the complete list. We
            do not use any data submitted through the quiz for advertising,
            and we do not share it with third-party advertising or analytics
            providers.
          </p>

          <h3>Children</h3>
          <p>
            The Site is intended for adults aged 18 and older. We do not
            knowingly collect data from anyone under 18. If you believe a minor
            has submitted information, contact us and we will delete it.
          </p>

          <h3>Security</h3>
          <p>
            We protect data in transit with TLS and at rest using
            industry-standard managed database encryption. No transmission or
            storage system is perfectly secure; we cannot guarantee absolute
            security. In the event of a breach affecting your information, we
            will notify you as required by applicable law, including the FTC
            Health Breach Notification Rule (16 CFR Part 318) and applicable
            state laws.
          </p>

          <h3>International users</h3>
          <p>
            The Site is operated from the United States. If you submit
            information from outside the U.S., your data will be transferred to
            and stored in the United States. We do not target the Site at users
            in the European Economic Area or the United Kingdom.
          </p>

          <h3>California users</h3>
          <p>
            California residents have the rights to know, delete, correct, and
            limit use of sensitive personal information under the CCPA/CPRA.
            The information we collect from the quiz, including the inference
            that you are seeking health-related services, is treated as
            &ldquo;sensitive personal information.&rdquo; We do not sell or
            share this data for cross-context behavioral advertising. To
            exercise California rights, use the contact methods in the Notice
            above.
          </p>
        </section>

        <section id="rights" className="legal-section">
          <h2>Summary of Your Rights</h2>
          <ul>
            <li>Right to know what we have collected about you.</li>
            <li>Right to a copy of your data.</li>
            <li>Right to delete your data.</li>
            <li>Right to withdraw consent.</li>
            <li>Right to appeal a denied request.</li>
            <li>Right to non-discrimination for exercising these rights.</li>
          </ul>
        </section>

        <section id="contact" className="legal-section">
          <h2>Contact</h2>
          <p>
            <strong>T-Shots &mdash; Privacy Team</strong>
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
          <Link href="/terms">Terms of Use</Link>
        </footer>
      </article>
    </main>
  );
}
