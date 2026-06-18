"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MainPage, AuditionPage, TeamSpacePage } from "./pages";
import { DownloadCTA } from "./shared";
import { type BannerDto, type PublicStats, type Tab } from "./data";
import { LangProvider, useLang } from "./i18n";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="언어 선택 / language">
      <button
        className={lang === "ko" ? "on" : ""}
        onClick={() => setLang("ko")}
      >
        KO
      </button>
      <button
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}

function LandingInner({
  banners,
  stats,
}: {
  banners: BannerDto[];
  stats: PublicStats | null;
}) {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("main");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((to: Tab) => {
    setTab(to);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // CHALLENGE 는 별도 탭이 없고 메인 하단 티저 섹션이 콘텐츠 →
  // 메인으로 전환한 뒤 챌린지 섹션으로 스크롤
  const goChallenge = useCallback(() => {
    setMenuOpen(false);
    setTab("main");
    // 메인이 렌더된 다음 프레임에 스크롤 (탭 전환 직후에도 동작)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document
          .getElementById("challenge")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
  }, []);

  // BANNER_ONLY 배너만 오디션 합격자 카드로 사용
  const auditionBanners = useMemo(
    () => banners.filter((b) => b.noticeLayout === "BANNER_ONLY"),
    [banners]
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: "main", label: t.nav.main },
    { id: "audition", label: "AUDITION" },
    { id: "teamspace", label: "TEAM SPACE" },
  ];

  return (
    <>
      <header className={"hdr" + (scrolled ? " scrolled" : "")}>
        <button className="brand" onClick={() => go("main")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/landing/zigg-icon.webp" alt="ZIGG" />
          <b>ZIGG</b>
        </button>
        {/* 언어 토글 — 데스크탑은 탭 앞, 모바일은 햄버거 왼쪽에 항상 노출 */}
        <LangToggle />
        <nav className={"nav" + (menuOpen ? " open" : "")}>
          {tabs.map((x) => (
            <button
              key={x.id}
              className={"nav-pill" + (tab === x.id ? " on" : "")}
              onClick={() => go(x.id)}
            >
              {x.label}
            </button>
          ))}
          <button className="nav-pill soon" onClick={goChallenge}>
            CHALLENGE
          </button>
        </nav>
        {/* 앱 다운로드 — 모바일에서도 항상 노출(플랫폼별 스토어 자동 분기) */}
        <DownloadCTA />
        <button
          className={"nav-burger" + (menuOpen ? " open" : "")}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="메뉴 / menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {tab === "main" && <MainPage banners={banners} go={go} />}
      {tab === "audition" && (
        <AuditionPage banners={auditionBanners} stats={stats} go={go} />
      )}
      {tab === "teamspace" && <TeamSpacePage go={go} />}
    </>
  );
}

export default function Landing(props: {
  banners: BannerDto[];
  stats: PublicStats | null;
}) {
  return (
    <LangProvider>
      <LandingInner {...props} />
    </LangProvider>
  );
}
