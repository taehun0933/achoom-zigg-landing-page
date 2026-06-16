"use client";

import {
  useReveal,
  Marquee,
  Lockup,
  Kinetic,
  NoticeCarousel,
  AuditionBanners,
} from "./shared";
import {
  KEYFUNC_IMAGES,
  LINKS,
  type BannerDto,
  type PublicStats,
  type Tab,
} from "./data";
import { useT, nl2br } from "./i18n";

function fmt(n: number | null | undefined) {
  if (n == null) return "—";
  return n.toLocaleString("en-US");
}

/* ---------------- MAIN ---------------- */
export function MainPage({
  banners,
  go,
}: {
  banners: BannerDto[];
  go: (t: Tab) => void;
}) {
  const t = useT();
  const ref = useReveal();
  return (
    <div className="page" ref={ref}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bigz">ZIGG</div>
        <div className="hero-grid">
          <div className="hero-copy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="zmark" src="/landing/zigg-icon.png" alt="ZIGG" />
            <div className="kick">{t.hero.kick}</div>
            <h1>
              {t.hero.h1Lead}
              <br />
              <span className="accent">{t.hero.h1Accent}</span>
              {t.hero.h1Tail}
            </h1>
            <p className="sub">{nl2br(t.hero.sub)}</p>
            <div className="hero-tags">
              <button className="tag" onClick={() => go("teamspace")}>
                TEAM SPACE
              </button>
              <button className="tag" onClick={() => go("audition")}>
                AUDITION
              </button>
              <button
                className="tag"
                onClick={() =>
                  document
                    .getElementById("challenge")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                CHALLENGE
              </button>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/landing/hero-studio.png"
                alt="ZIGG x GODITION"
              />
            </div>
            {t.feedback.map((f, i) => (
              <div
                key={i}
                className="fb-float"
                style={{
                  left: i === 0 ? "-60px" : "auto",
                  right: i === 0 ? "auto" : i === 1 ? "-50px" : "-20px",
                  top: i === 0 ? "58%" : i === 1 ? "40%" : "auto",
                  bottom: i === 2 ? "4%" : "auto",
                }}
              >
                <div
                  className="fb"
                  style={{
                    animation: `bob ${5 + i * 0.5}s ease-in-out ${
                      i * 0.5
                    }s infinite`,
                  }}
                >
                  <div className="meta">
                    <span className="t">{f.t}</span>
                    <span className="who">{f.who}</span>
                  </div>
                  <div className="msg">{f.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* NOTICE (API) — directly below hero */}
      <NoticeCarousel banners={banners} />

      {/* SERVICE */}
      <section className="svc">
        <div className="wrap">
          <div
            className="section-label reveal"
            style={{ display: "block", textAlign: "center", marginBottom: 60 }}
          >
            SERVICE
          </div>
          <div className="svc-grid">
            <div className="svc-icon reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/landing/zigg-icon.png" alt="ZIGG" />
            </div>
            <div>
              <div className="section-label reveal">{t.service.eyebrow}</div>
              <h2 className="reveal">
                <b>ZIGG</b>
                {nl2br(t.service.h2Rest)}
              </h2>
              <p className="hl reveal">{t.service.p1}</p>
              <p className="reveal">
                {t.service.p2pre}
                <span className="b">{t.service.p2strong}</span>
                {t.service.p2post}
              </p>
              <p className="reveal">
                <span className="blue">{t.service.p3}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* cross-link to audition / team space */}
      <section className="section tight">
        <div className="wrap" style={{ textAlign: "center" }}>
          <div
            className="section-label reveal"
            style={{ display: "block", marginBottom: 28 }}
          >
            {t.more}
          </div>
          <div
            className="reveal"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="tag lg" onClick={() => go("audition")}>
              AUDITION →
            </button>
            <button className="tag lg" onClick={() => go("teamspace")}>
              TEAM SPACE →
            </button>
          </div>
        </div>
      </section>

      <ChallengeTeaser />
      <Footer go={go} />
    </div>
  );
}

/* ---------------- AUDITION ---------------- */
export function AuditionPage({
  banners,
  stats,
  go,
}: {
  banners: BannerDto[];
  stats: PublicStats | null;
  go?: (t: Tab) => void;
}) {
  const t = useT();
  const ref = useReveal();
  return (
    <div className="page" ref={ref}>
      <section className="aud">
        <div className="wrap">
          <div className="ph">
            <Lockup />
            <Kinetic w1="AUDITION" w2="GODITION" />
            <div className="ph-sub reveal">{t.audition.sub}</div>
          </div>

          <AuditionBanners banners={banners} />

          <div className="aud-stats">
            <div className="aud-stat a reveal">
              <div className="as-k">{t.audition.appLabel}</div>
              <div className="as-v">
                {fmt(stats?.totalApplications)}
                {t.audition.appUnit && <small>{t.audition.appUnit}</small>}
              </div>
              <div className="as-d">{t.audition.appDesc}</div>
            </div>
            <div className="aud-stat b reveal">
              <div className="as-k">{t.audition.audLabel}</div>
              <div className="as-v">
                {fmt(stats?.totalAuditions)}
                {t.audition.audUnit && <small>{t.audition.audUnit}</small>}
              </div>
              <div className="as-d">{t.audition.audDesc}</div>
            </div>
          </div>
        </div>
      </section>

      <Marquee blue />
      <Footer go={go} />
    </div>
  );
}

/* ---------------- TEAM SPACE ---------------- */
export function TeamSpacePage({ go }: { go?: (t: Tab) => void }) {
  const t = useT();
  const ref = useReveal();
  return (
    <div className="page" ref={ref}>
      <section className="ts">
        <div className="wrap">
          <div className="ph">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="z"
              src="/landing/zigg-icon.png"
              alt="ZIGG"
              style={{ width: 56, margin: "0 auto 22px" }}
            />
            <Kinetic w1="TEAM SPACE" w2="ZIGG" />
          </div>

          {/* SPACE — 멤버 초대 */}
          <div className="ts-block">
            <div className="tb-head reveal">
              <div className="lbl">{t.teamspace.spaceLabel}</div>
              <div className="dsc">{t.teamspace.spaceDesc}</div>
            </div>
            <div className="ts-space">
              <div className="reveal" style={{ maxWidth: 300, margin: "0 auto" }}>
                <div className="phone" style={{ width: 280 }}>
                  <div className="notch" />
                  <div className="phone-screen" style={{ background: "#fff" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/spaceMemberInvite.png"
                      alt="space member invite"
                      style={{ objectPosition: "top" }}
                    />
                  </div>
                </div>
              </div>
              <div className="ts-annot">
                {t.teamspace.spaceAnnots.map((a, i) => (
                  <div className="an" key={i}>
                    <b>{a.title}</b>
                    <span>{a.desc}</span>
                  </div>
                ))}
                <div className="player reveal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/landing/teamspace-1.png" alt="fullscreen feedback" />
                </div>
              </div>
            </div>
          </div>

          {/* HISTORY — 연습 영상 업로드/피드백 */}
          <div className="ts-block">
            <div className="tb-head reveal">
              <div className="lbl">{t.teamspace.historyLabel}</div>
              <div className="dsc">{t.teamspace.historyDesc}</div>
            </div>
            <div className="ts-history">
              <div className="reveal">
                <div className="player">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/landing/teamspace-2.png" alt="history detail" />
                </div>
              </div>
              <div className="ts-annot">
                {t.teamspace.historyAnnots.map((a, i) => (
                  <div className="an" key={i}>
                    <b>{a.title}</b>
                    <span>{a.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KEY FUNCTION */}
          <div className="ts-block">
            <div
              className="section-label reveal"
              style={{ display: "block", fontSize: 22, letterSpacing: ".06em" }}
            >
              {t.teamspace.keyFunction}
            </div>
            <div className="kf-grid">
              {t.teamspace.keyfuncs.map((k, i) => (
                <div className="kf-card reveal" key={i}>
                  <div className="kf-n">key function {i + 1}</div>
                  <div className="kf-pill">{k.pill}</div>
                  <div className="kf-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={KEYFUNC_IMAGES[i]} alt={k.title} />
                  </div>
                  <h4>{k.title}</h4>
                  <p>{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer go={go} />
    </div>
  );
}

/* ---------------- CHALLENGE teaser ---------------- */
export function ChallengeTeaser() {
  const t = useT();
  const ref = useReveal();
  return (
    <section className="chl" id="challenge" ref={ref}>
      <div className="wrap">
        <div className="chl-inner reveal">
          <span className="soon-pill">◆ COMING SOON</span>
          <h2>
            ZIGG <span className="g">CHALLENGE</span>
          </h2>
          <p>{nl2br(t.challenge.desc)}</p>
          <div className="chl-row">
            {t.challenge.tags.map((tag, i) => (
              <span className="tag" key={i}>
                {tag}
              </span>
            ))}
          </div>
          <div className="chl-feat">
            {t.challenge.feats.map((f, i) => (
              <div key={i}>
                <b>{f.title}</b>
                <span>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer({ go }: { go?: (t: Tab) => void }) {
  const t = useT();
  return (
    <footer className="ft">
      <div className="wrap ft-grid">
        <div>
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing/zigg-icon.png" alt="" />
            <b>ZIGG</b>
          </div>
          <p className="ft-desc">{t.footer.desc}</p>
          <div className="ft-store">
            <a href={LINKS.appStore} target="_blank" rel="noopener noreferrer">
              App Store
            </a>
            <a href={LINKS.googlePlay} target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
          </div>
        </div>
        <div className="ft-cols">
          <div className="ft-col">
            <h5>Product</h5>
            <a onClick={() => go?.("main")}>{t.nav.main}</a>
            <a onClick={() => go?.("audition")}>Audition</a>
            <a onClick={() => go?.("teamspace")}>Team Space</a>
            <a>
              Challenge{" "}
              <span style={{ color: "var(--violet-soft)", fontSize: 11 }}>
                SOON
              </span>
            </a>
          </div>
          <div className="ft-col">
            <h5>Company</h5>
            <a>About</a>
            <a>Team ZIGG</a>
            <a>Partners</a>
            <a href={`mailto:${LINKS.contactEmail}`}>{LINKS.contactEmail}</a>
          </div>
          <div className="ft-col">
            <h5>Follow</h5>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="wrap ft-base">
        <span>© 2025 ZIGG. All rights reserved.</span>
        <span>{t.footer.legal}</span>
      </div>
    </footer>
  );
}
