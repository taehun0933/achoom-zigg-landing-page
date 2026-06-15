/* ============================================================
   ZIGG landing — shared types, links, static copy
   ============================================================ */

/** /api/v0/notices/banners item shape */
export interface BannerImage {
  imageKey: string; // full CDN url
  onClickUrl: string | null;
}
export interface BannerDto {
  noticeId: number;
  noticeLayout: "COMMON" | "BANNER_ONLY";
  bannerImage: BannerImage;
}

/** /api/v1/stats/public shape */
export interface PublicStats {
  statDate: string;
  totalAuditions: number;
  totalApplications: number;
}

export const LINKS = {
  appStore: "https://apps.apple.com/kr/app/zigg/id6670358731",
  googlePlay:
    "https://play.google.com/store/apps/details?id=com.achoom.ZIGG&pcampaignid=web_share",
  instagram:
    "https://www.instagram.com/godition_official?igsh=MWRzcDlkMWFzY2s2aQ==",
  youtube: "https://www.youtube.com/@godition",
  contactEmail: "godition@naver.com",
};

/** team space key function 이미지 (텍스트는 locales 에서 — 기능 의미에 맞춰 매핑) */
export const KEYFUNC_IMAGES = [
  "/landing/teamspace-1.png",
  "/landing/teamspace-2.png",
  "/images/spaceMemberInvite.png",
];

export type Tab = "main" | "audition" | "teamspace";
