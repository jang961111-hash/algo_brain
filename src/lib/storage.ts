import type { AnalysisResult } from "@/lib/analysis";

export type StoredProfile = AnalysisResult & {
  isPublic: boolean;
  allowSensitive: boolean;
};

export const STORAGE_KEY = "algombti.profile";

export const saveProfile = (profile: StoredProfile) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

export const loadProfile = (): StoredProfile | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as StoredProfile;
  } catch (error) {
    console.warn("Failed to parse stored profile", error);
    return null;
  }
};
