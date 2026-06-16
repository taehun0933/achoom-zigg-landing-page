"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Fragment,
  type ReactNode,
} from "react";
import ko from "./locales/ko.json";
import en from "./locales/en.json";

export type Lang = "ko" | "en";

/** client-reactNative 처럼 locales/*.json 으로 분리 */
const STRINGS = { ko, en } as const;
export type Strings = (typeof STRINGS)["ko"];

/**
 * 브라우저 정보로 언어 자동 감지 (권한 팝업 없음).
 * 1) 선호 언어 목록(navigator.languages) 에 한국어가 있으면 ko
 * 2) 없으면 타임존(위치 추정)이 한국이면 ko  ← GPS 권한 없이 즉시 판별
 * 3) 그 외 영어
 */
function detectLang(): Lang {
  try {
    const prefs = (
      navigator.languages?.length ? navigator.languages : [navigator.language]
    )
      .filter(Boolean)
      .map((l) => l.toLowerCase());
    if (prefs.some((l) => l.startsWith("ko"))) return "ko";

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz === "Asia/Seoul" || tz === "Asia/Pyongyang") return "ko";
  } catch {
    /* noop */
  }
  return "en";
}

/** "\n" 을 <br/> 로 렌더 */
export function nl2br(text: string): ReactNode {
  return text.split("\n").map((line, i, arr) => (
    <Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </Fragment>
  ));
}

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}
const LangContext = createContext<LangCtx>({
  lang: "ko",
  setLang: () => {},
  t: ko,
});

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR/첫 렌더는 항상 ko → 하이드레이션 불일치 방지, 마운트 후 감지/복원
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("zigg_lang");
      if (stored === "ko" || stored === "en") {
        setLangState(stored);
        return;
      }
      // 사용자가 직접 고른 적 없으면 브라우저 언어·위치로 자동 감지
      setLangState(detectLang());
    } catch {
      /* noop */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("zigg_lang", l);
    } catch {
      /* noop */
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
export function useT(): Strings {
  return useContext(LangContext).t;
}
