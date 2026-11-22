"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error so it shows up in the browser console / Vercel logs
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="err-wrap">
      <style>{`
        .err-wrap {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 5vw, 3rem);
          background: #fafaf7;
          color: #1f1b16;
        }
        .err-card {
          width: 100%;
          max-width: 34rem;
          text-align: center;
          padding: clamp(1.5rem, 6vw, 3rem) clamp(1.25rem, 5vw, 2.5rem);
          border: 1px solid #e6e1d8;
          border-radius: 1.25rem;
          background: #ffffff;
        }
        .err-icon {
          width: clamp(5rem, 22vw, 7.5rem);
          height: auto;
          margin: 0 auto 1.25rem;
          display: block;
        }
        .err-title {
          margin: 0 0 0.6rem;
          font-size: clamp(1.4rem, 5vw, 2rem);
          line-height: 1.2;
          font-weight: 700;
        }
        .err-text {
          margin: 0 auto 1.75rem;
          max-width: 28rem;
          font-size: clamp(0.95rem, 2.8vw, 1.05rem);
          line-height: 1.6;
          color: #5a5249;
        }
        .err-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .err-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.4rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid transparent;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }
        .err-btn:focus-visible {
          outline: 3px solid #2f6b3a;
          outline-offset: 2px;
        }
        .err-btn-primary {
          background: #c8321f;
          color: #ffffff;
        }
        .err-btn-primary:hover {
          background: #a82817;
        }
        .err-btn-secondary {
          background: transparent;
          color: #1f1b16;
          border-color: #d8d2c6;
        }
        .err-btn-secondary:hover {
          border-color: #1f1b16;
        }
        .err-digest {
          margin: 1.5rem 0 0;
          font-size: 0.8rem;
          color: #8a8176;
          word-break: break-all;
        }
        @media (min-width: 480px) {
          .err-actions {
            flex-direction: row;
            justify-content: center;
          }
        }
      `}</style>

      <section className="err-card" role="alert">
        {/* Pizza slice icon */}
        <svg
          className="err-icon"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M60 108 L14 28 Q60 6 106 28 Z"
            fill="#f3c969"
            stroke="#c8851f"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M14 28 Q60 6 106 28"
            stroke="#c8851f"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="45" cy="45" r="7" fill="#c8321f" />
          <circle cx="72" cy="42" r="6" fill="#c8321f" />
          <circle cx="58" cy="68" r="7" fill="#c8321f" />
          <circle cx="60" cy="88" r="4" fill="#c8321f" />
          <circle cx="84" cy="30" r="3.5" fill="#2f6b3a" />
          <circle cx="36" cy="30" r="3.5" fill="#2f6b3a" />
        </svg>

        <h1 className="err-title">Something went wrong</h1>
        <p className="err-text">
          We couldn&apos;t load this page. This is usually a temporary problem
          with the connection to our server. Try again, or go back to the home
          page.
        </p>

        <div className="err-actions">
          <button
            type="button"
            className="err-btn err-btn-primary"
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link href="/" className="err-btn err-btn-secondary">
            Go to home page
          </Link>
        </div>

        {error.digest && (
          <p className="err-digest">Error reference: {error.digest}</p>
        )}
      </section>
    </main>
  );
}