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
  const [paused, setPaused] = useState(false);
  // 양끝에 clone 을 둔 무한 슬라이드. 실제 배너 0번은 트랙 위치 1번에 위치.
  const [pos, setPos] = useState(1);
  const [anim, setAnim] = useState(true);
  const ref = useReveal();

  const n = banners.length;
  const realIdx = n > 0 ? ((((pos - 1) % n) + n) % n) : 0;
  // [마지막 clone, ...전체, 첫 clone]
  const slides = n > 0 ? [banners[n - 1], ...banners, banners[0]] : [];

  const move = useCallback((d: number) => {
    setAnim(true);
    setPos((p) => p + d);
  }, []);
  const goReal = useCallback((i: number) => {
    setAnim(true);
    setPos(i + 1);
  }, []);

  // autoplay (마우스 오버 시 일시정지)
  useEffect(() => {
    if (n <= 1 || paused) return;
    const id = setInterval(() => {
      setAnim(true);
      setPos((p) => p + 1);
    }, 5500);
    return () => clearInterval(id);
  }, [n, paused]);

  // clone 에 도달하면 트랜지션 끝난 뒤 애니메이션 없이 실제 위치로 스냅
  const onTrackEnd = () => {
    if (pos === n + 1) {
      setAnim(false);
      setPos(1);
    } else if (pos === 0) {
      setAnim(false);
      setPos(n);
    }
  };

  // 스냅(애니메이션 off) 후 다음 프레임에 다시 애니메이션 활성화
  useEffect(() => {
    if (anim) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnim(true))
    );
    return () => cancelAnimationFrame(id);
  }, [anim]);

  return (
    <section className="notice" ref={ref}>
      <div className="wrap">
        <div className="notice-head reveal">
          <div>
            <span className="live-dot">
              <i />
              LIVE
            </span>
            <h2>
              ZIGG <span className="x">소식</span>
            </h2>
          </div>
          {n > 1 && (
            <div className="nc-arrows">
              <button onClick={() => move(-1)} aria-label="이전">
                ‹
              </button>
              <button onClick={() => move(1)} aria-label="다음">
                ›
              </button>
            </div>
          )}
        </div>

        <div
          className="nc-stage reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {n === 0 ? (
            <div className="nc-skeleton">공지사항을 불러오는 중…</div>
          ) : (
            <>
              <div className="nc-card">
                <div
                  className="nc-track"
                  style={{
                    transform: `translateX(-${pos * 100}%)`,
                    transition: anim ? undefined : "none",
                  }}
                  onTransitionEnd={onTrackEnd}
                >
                  {slides.map((b, i) => (
                    <BannerSlide key={i} banner={b} />
                  ))}
                </div>
              </div>
              <div className="nc-controls">
                <div className="nc-dots">
                  {banners.map((b, i) => (
                    <b
                      key={b.noticeId}
                      className={i === realIdx ? "on" : ""}
                      onClick={() => goReal(i)}
                    />
                  ))}
                </div>
                <span className="nc-date">
                  {realIdx + 1} / {n}
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
  return url ? (
    <a
      className="nc-slide"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  ) : (
    <div className="nc-slide">{inner}</div>
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
