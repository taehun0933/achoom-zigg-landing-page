import DesktopScreen from "@/components/desktop/DesktopScreen";
import MobileScreen from "@/components/mobile/MobileScreen";

export default function Home() {
  console.log("test");

  return (
    <div>
      <div className="block lg:hidden">
        <MobileScreen />
      </div>
      <div className="hidden lg:block">
        <DesktopScreen />
      </div>
    </div>
  );
}
