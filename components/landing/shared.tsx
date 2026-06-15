"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from "react";
import type { BannerDto } from "./data";

/* ---------- scroll reveal hook ---------- */
export function useReveal(): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
    // safety net: never leave content hidden if IO doesn't fire
    const fallback = setTimeout(
      () => nodes.forEach((n) => n.classList.add("in")),
      1600
    );
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  });
  return ref;
}

/* ---------- ZIGG · GODITION marquee ---------- */
export function Marquee({ blue = false }: { blue?: boolean }) {
  const items = [];
  for (let i = 0; i < 14; i++) {
    items.push(
      <span key={"z" + i} className="z">
        ZIGG
      </span>
    );
    items.push(
      <span key={"g" + i} className="g">
        GODITION
      </span>
    );
  }
  return (
    <div className={"marquee" + (blue ? " blue" : "")}>
      <div className="marquee-track">{items}</div>
    </div>
  );
}

/* ---------- GODITION lockup (ZIGG x GODITION) ---------- */
export function Lockup() {
  return (
    <div className="lockup">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="z" src="/landing/zigg-icon.png" alt="ZIGG" />
      <span className="x">✕</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="god" src="/landing/godition-text.svg" alt="GODITION" />
    </div>
  );
}

/* ---------- kinetic heading "AUDITION with GODITION" ---------- */
export function Kinetic({ w1, w2 }: { w1: string; w2: string }) {
  return (
    <h2 className="kinetic">
      <span className="streak" style={{ top: "18%", width: 70, opacity: 0.8 }} />
      <span
        className="streak"
        style={{ top: "62%", width: 46, left: -28, opacity: 0.5 }}
      />
      <span className="w1">{w1}</span>
      <span className="with">with</span>
      <span className="w2">{w2}</span>
    </h2>
  );
}

/* ============================================================
   NOTICE CAROUSEL — banner images from /api/v0/notices/banners
   (모든 배너를 풀카드 슬라이드로 노출)
   ============================================================ */
export function NoticeCarousel({ banners }: { banners: BannerDto[] }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const ref = useReveal();

  const n = banners.length;
  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  // autoplay
  useEffect(() => {
    if (n <= 1) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % n), 5200);
    return () => clearInterval(timer.current);
  }, [n]);

  return (
    <section className="notice" ref={ref}>
      <div className="wrap">
        <div className="notice-head reveal">
          <div>
            <span className="live-dot">
              <i />
              LIVE · 앱 공지사항 API 연동
            </span>
            <h2>
              ZIGG <span className="x">소식</span>
            </h2>
            <p>앱에서 보던 공지·이벤트·업데이트 배너를 랜딩에서도.</p>
          </div>
          {n > 1 && (
            <div className="nc-arrows">
              <button onClick={() => go(-1)} aria-label="이전">
                ‹
              </button>
              <button onClick={() => go(1)} aria-label="다음">
                ›
              </button>
            </div>
          )}
        </div>

        <div className="nc-stage reveal">
          {n === 0 ? (
            <div className="nc-skeleton">공지사항을 불러오는 중…</div>
          ) : (
            <>
              <BannerSlide key={banners[idx].noticeId} banner={banners[idx]} />
              <div className="nc-controls">
                <div className="nc-dots">
                  {banners.map((b, i) => (
                    <b
                      key={b.noticeId}
                      className={i === idx ? "on" : ""}
                      onClick={() => setIdx(i)}
                    />
                  ))}
                </div>
                <span className="nc-date">
                  {idx + 1} / {n}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function BannerSlide({ banner }: { banner: BannerDto }) {
  const url = banner.bannerImage.onClickUrl;
  const inner = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={banner.bannerImage.imageKey} alt="ZIGG 공지 배너" />
  );
  return (
    <div className="nc-card nc-slide enter">
      {url ? (
        <a
          className="nc-banner clickable"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : (
        <div className="nc-banner">{inner}</div>
      )}
    </div>
  );
}

/* ============================================================
   AUDITION banner cards — image-only banners (합격자 발표 등)
   ============================================================ */
export function AuditionBanners({ banners }: { banners: BannerDto[] }) {
  if (banners.length === 0) {
    return (
      <div className="aud-cards reveal">
        <div className="nc-skeleton" style={{ flex: 1 }}>
          합격자 발표 배너를 준비 중입니다.
        </div>
      </div>
    );
  }
  // duplicate for seamless marquee loop
  const loop = [...banners, ...banners];
  return (
    <div className="aud-cards reveal">
      <div className="aud-track">
        {loop.map((b, i) => {
          const url = b.bannerImage.onClickUrl;
          const card = (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={b.bannerImage.imageKey} alt="오디션 합격자 발표" />
          );
          return url ? (
            <a
              key={i}
              className="pass-card clickable"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {card}
            </a>
          ) : (
            <div key={i} className="pass-card">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
