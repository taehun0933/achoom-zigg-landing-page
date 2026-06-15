"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MainPage, AuditionPage, TeamSpacePage } from "./pages";
import { LINKS, type BannerDto, type PublicStats, type Tab } from "./data";

const TABS: { id: Tab; label: string }[] = [
  { id: "main", label: "메인" },
  { id: "audition", label: "AUDITION" },
  { id: "teamspace", label: "TEAM SPACE" },
];

export default function Landing({
  banners,
  stats,
}: {
  banners: BannerDto[];
  stats: PublicStats | null;
}) {
  const [tab, setTab] = useState<Tab>("main");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((to: Tab) => {
    setTab(to);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // BANNER_ONLY 배너만 오디션 합격자 카드로 사용
  const auditionBanners = useMemo(
    () => banners.filter((b) => b.noticeLayout === "BANNER_ONLY"),
    [banners]
  );

  return (
    <>
      <header className={"hdr" + (scrolled ? " scrolled" : "")}>
        <button className="brand" onClick={() => go("main")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/landing/zigg-icon.png" alt="ZIGG" />
          <b>ZIGG</b>
        </button>
        <nav className="nav">
          {TABS.map((x) => (
            <button
              key={x.id}
              className={"nav-pill" + (tab === x.id ? " on" : "")}
              onClick={() => go(x.id)}
            >
              {x.label}
            </button>
          ))}
          <button className="nav-pill soon">CHALLENGE</button>
          <a
            className="nav-cta"
            href={LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
          >
            앱 다운로드
          </a>
        </nav>
      </header>

      {tab === "main" && <MainPage banners={banners} go={go} />}
      {tab === "audition" && (
        <AuditionPage banners={auditionBanners} stats={stats} />
      )}
      {tab === "teamspace" && <TeamSpacePage />}
    </>
  );
}
