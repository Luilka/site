import BrandMark from "@/components/layout/brand-mark.tsx";
import HeaderActions from "@/components/layout/header-actions.tsx";
import MainNavigation from "@/components/layout/navigation/main-navigation.tsx";

export default function Header() {
  return (
    <header className="sticky top-0 z-13 border-[0.04375rem] border-[#dee0e3]">
      <div className="header-surface bg-white/80 backdrop-blur" aria-hidden="true" />
      <div className="nav mx-auto flex h-17.75 w-full max-w-7xl flex-row items-center justify-between gap-8 px-6 lg:px-10">
        <BrandMark /><MainNavigation /><HeaderActions />
      </div>
    </header>
  );
}
