"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { analyzeInput, type Platform } from "@/lib/analysis";
import { saveProfile } from "@/lib/storage";

const PLATFORM_OPTIONS: Platform[] = ["YouTube", "Spotify", "Melon"];

export default function InputPage() {
  const router = useRouter();
  const [platform, setPlatform] = useState<Platform>("YouTube");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (text.trim().length < 4) {
      setError("시청·청취 기록을 조금 더 입력해주세요.");
      return;
    }
    const analysis = analyzeInput(text, platform);
    saveProfile({
      ...analysis,
      isPublic: false,
      allowSensitive: false,
    });
    router.push("/result");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase text-slate-400">
          Step 1
        </p>
        <h1 className="text-3xl font-semibold">기록을 붙여넣어 주세요</h1>
        <p className="text-slate-600">
          플랫폼을 선택하고 제목 리스트를 붙여넣으면 알고리즘 성향을
          분석합니다.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-semibold">플랫폼 선택</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPlatform(option)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    platform === option
                      ? "bg-ink text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">제목 리스트</p>
              <span className="text-xs text-slate-400">
                줄바꿈/쉼표 구분 가능
              </span>
            </div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="예) 집중을 위한 lofi playlist\n코딩 튜토리얼 요약\n퇴근길 감성 플레이리스트"
              className="mt-2 h-40 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-violet-400 focus:outline-none"
            />
          </div>
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-violet-600"
          >
            분석하기
          </button>
        </div>
      </div>
    </div>
  );
}
