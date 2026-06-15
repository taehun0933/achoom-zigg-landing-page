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

/** hero floating feedback bubbles */
export const FEEDBACK = [
  { t: "1:37", who: "@모두에게", msg: "템포 살짝 빨라! 🔥🔥" },
  {
    t: "1:37",
    who: "@강지훈",
    msg: "손 올리는 타이밍이 달라요! 속으로 카운트 세면서 합시다.",
  },
  { t: "1:43", who: "@김주혁", msg: "조금 더 빡쎄게 춰야함" },
];

/** team space key functions — images mapped to feature meaning */
export const KEYFUNCS = [
  {
    n: "key function 1",
    pill: "간편한 피드백",
    img: "/landing/teamspace-1.png",
    title: "타임스탬프 PIN 기능",
    desc: "영상의 정확한 구간에 코멘트를 핀으로 고정. 탭형 피드백으로 누구에게 남기는 코멘트인지 한눈에.",
  },
  {
    n: "key function 2",
    pill: "아카이빙",
    img: "/landing/teamspace-2.png",
    title: "연습 영상을 한 곳에",
    desc: "히스토리로 쌓이는 모든 연습 영상을 날짜별로 아카이빙. 흘려보내던 기록이 팀의 자산이 됩니다.",
  },
  {
    n: "key function 3",
    pill: "정확한 소통",
    img: "/images/spaceMemberInvite.png",
    title: "스페이스 · 멤버 초대",
    desc: "공연을 함께 준비하는 멤버를 초대하고, 팀 단위로 영상과 피드백을 정확하게 주고받으세요.",
  },
];

export type Tab = "main" | "audition" | "teamspace";
