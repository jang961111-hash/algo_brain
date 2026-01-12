"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  createComparisonQuestions,
  getMaskedKeywords,
  sampleFriendProfile,
} from "@/lib/analysis";
import { loadProfile, type StoredProfile } from "@/lib/storage";

export default function ComparePage() {
  const [profile, setProfile] = useState<StoredProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const comparison = useMemo(() => {
    if (!profile) {
      return null;
    }
    const myKeywords = getMaskedKeywords(
      profile.keywords,
      profile.allowSensitive
    );
    const friendKeywords = sampleFriendProfile.keywords;
    const common = myKeywords.filter((keyword) =>
      friendKeywords.includes(keyword)
    );
    const uniqueMine = myKeywords.filter(
      (keyword) => !friendKeywords.includes(keyword)
    );
    const uniqueFriend = friendKeywords.filter(
      (keyword) => !myKeywords.includes(keyword)
    );

    return {
      common,
      uniqueMine,
      uniqueFriend,
      questions: createComparisonQuestions(myKeywords, friendKeywords),
    };
  }, [profile]);

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <h1 className="text-3xl font-semibold">비교할 카드가 없어요</h1>
        <p className="text-slate-600">먼저 입력을 완료해주세요.</p>
        <Link
          href="/input"
          className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          입력하러 가기
        </Link>
      </div>
    );
  }

  if (!comparison) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Compare</p>
          <h1 className="text-3xl font-semibold">친구 카드와 비교</h1>
        </div>
        <Link
          href="/result"
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
        >
          내 카드 보기
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">내 AlgoMBTI</p>
          <p className="text-xs text-slate-500">{profile.algoType}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {getMaskedKeywords(profile.keywords, profile.allowSensitive).map(
              (keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-slate-100 px-3 py-1"
                >
                  {keyword}
                </span>
              )
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">{sampleFriendProfile.name}</p>
          <p className="text-xs text-slate-500">{sampleFriendProfile.algoType}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {sampleFriendProfile.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-slate-100 px-3 py-1"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">공통점</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {comparison.common.length ? (
              comparison.common.map((keyword) => (
                <li key={keyword}>• {keyword}</li>
              ))
            ) : (
              <li>• 아직 겹치는 키워드가 없어요.</li>
            )}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">차이점</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {comparison.uniqueMine.slice(0, 3).map((keyword) => (
              <li key={keyword}>• 나는 {keyword}</li>
            ))}
            {comparison.uniqueFriend.slice(0, 3).map((keyword) => (
              <li key={keyword}>• 친구는 {keyword}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">추천 대화 질문</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {comparison.questions.map((question) => (
              <li key={question}>• {question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
