import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AlgoMBTI",
  description: "시청·청취 기록으로 만드는 알고리즘 성향 프로필",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
          <header className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold">
              AlgoMBTI
            </Link>
            <nav className="flex gap-4 text-sm text-slate-600">
              <Link href="/input" className="hover:text-ink">
                입력
              </Link>
              <Link href="/result" className="hover:text-ink">
                결과
              </Link>
              <Link href="/compare" className="hover:text-ink">
                비교
              </Link>
            </nav>
          </header>
          <main className="flex-1 py-8">{children}</main>
          <footer className="border-t border-slate-200 pt-6 text-xs text-slate-500">
            AlgoMBTI · Prototype
          </footer>
        </div>
      </body>
    </html>
  );
}
