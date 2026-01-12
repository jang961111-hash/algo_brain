"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getMaskedKeywords,
  maskKeyword,
  sampleFriendProfile,
} from "@/lib/analysis";
import { loadProfile, saveProfile, type StoredProfile } from "@/lib/storage";

const COLORS = ["#7C3AED", "#0EA5E9", "#F97316", "#10B981", "#FACC15"];

export default function ResultPage() {
  const [profile, setProfile] = useState<StoredProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const maskedKeywords = useMemo(() => {
    if (!profile) {
      return [];
    }
    return getMaskedKeywords(profile.keywords, profile.allowSensitive);
  }, [profile]);

  const handleToggle = (key: "isPublic" | "allowSensitive") => {
    if (!profile) {
      return;
    }
    const updated = { ...profile, [key]: !profile[key] };
    saveProfile(updated);
    setProfile(updated);
  };

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <h1 className="text-3xl font-semibold">아직 결과가 없어요</h1>
        <p className="text-slate-600">
          입력 페이지에서 기록을 붙여넣고 결과를 확인하세요.
        </p>
        <Link
          href="/input"
          className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          입력하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                {profile.platform} 분석 결과
              </p>
              <h1 className="text-2xl font-semibold">AlgoMBTI 프로필 카드</h1>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
              {profile.algoType}
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">키워드 Top 10</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                {maskedKeywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full bg-white px-3 py-1 text-xs text-slate-700"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">캐치프레이즈</p>
              <p className="mt-2 text-sm text-slate-700">{profile.catchphrase}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
              <p className="text-xs font-semibold text-slate-400">3문장 요약</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {profile.summary.map((sentence) => (
                  <li key={sentence}>• {sentence}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">공개 범위 설정</p>
              <p className="text-xs text-slate-500">
                {profile.isPublic ? "전체 공개" : "친구에게만"} 설정됨
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("isPublic")}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                profile.isPublic ? "bg-accent" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  profile.isPublic ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">카테고리 비율</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profile.categories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {profile.categories.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 space-y-2 text-xs text-slate-600">
            {profile.categories.map((entry, index) => (
              <li key={entry.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="flex-1">{entry.name}</span>
                <span>{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">민감 키워드 표시</p>
              <p className="text-xs text-slate-500">
                {profile.allowSensitive
                  ? "민감 키워드를 공개합니다"
                  : "민감 키워드를 마스킹합니다"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("allowSensitive")}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                profile.allowSensitive ? "bg-sky" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  profile.allowSensitive ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
            예시 민감 키워드: {maskKeyword("정치")}, {maskKeyword("건강")}
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-xs text-slate-500">
          친구 카드 예시: {sampleFriendProfile.name} · {sampleFriendProfile.algoType}
        </div>
      </aside>
    </div>
  );
}
