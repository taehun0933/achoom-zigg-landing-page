import Landing from "@/components/landing/Landing";
import type { BannerDto, PublicStats } from "@/components/landing/data";

// zigg-backend 공개 API. 배포 환경에 맞춰 ZIGG_API_BASE 로 override 가능.
const API_BASE = process.env.ZIGG_API_BASE ?? "https://prod.achoom-zigg.com";

async function getBanners(): Promise<BannerDto[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v0/notices/banners`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as BannerDto[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function getStats(): Promise<PublicStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/stats/public`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as PublicStats;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [banners, stats] = await Promise.all([getBanners(), getStats()]);
  return <Landing banners={banners} stats={stats} />;
}
