import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold font-[family-name:var(--font-heading)] text-[var(--accent)] mb-4">
        404
      </h1>
      <p className="text-xl text-[var(--ink)]/60 mb-8 font-[family-name:var(--font-heading)]">
        Page not found
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity font-[family-name:var(--font-heading)]"
      >
        Back to Home
      </Link>
    </main>
  );
}
