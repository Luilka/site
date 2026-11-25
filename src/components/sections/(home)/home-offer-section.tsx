import HomeProducts from "@/components/sections/(home)/home-products-section.tsx";
import HomeServices from "@/components/sections/(home)/home-services-section.tsx";
import ProcessBand from "@/components/patterns/process-band.tsx";

export default function HomeOffer() {
  return (
    <>
      <ProcessBand reverse />
      <HomeServices />
      <ProcessBand />
      <HomeProducts />
    </>
  );
}
