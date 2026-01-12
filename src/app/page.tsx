import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          AlgoMBTI · 프로토타입
        </span>
        <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
          당신의 시청·청취 기록으로 만드는 알고리즘 성향 카드
        </h1>
        <p className="text-base text-slate-600 md:text-lg">
          유튜브, 스포티파이, 멜론 기록을 붙여넣으면 키워드와 카테고리
          비율을 추출해 가상의 알고리즘 프로필을 만들어드립니다.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/input"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            데모 시작하기
          </Link>
          <Link
            href="/result"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            결과 예시 보기
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "텍스트 붙여넣기만으로 10초 분석",
            "민감 키워드는 기본 마스킹",
            "비율 차트로 소비 성향 시각화",
            "친구 카드와 비교 기능",
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Sample
              </p>
              <p className="text-xl font-semibold">AlgoMBTI 카드</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
              AM-음악-AL
            </span>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">
              키워드: lofi, 코딩, 집중, 튜토리얼, 힙합...
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              알고리즘 성향: 몰입형 집중 + 감성 탐험
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              공개 범위: 친구에게만 공개
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
