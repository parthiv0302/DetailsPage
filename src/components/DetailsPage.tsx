"use client";

import { useState } from "react";
import {
  Navbar,
  Breadcrumb,
  ImageGallery,
  PropertyHeader,
  PropertyFeaturesRow,
  OverviewSection,
  BuilderUnitOverview,
  BuilderInfoSection,
  UnitPlansSection,
  MasterPlanSection,
  LocationSection,
  AmenitiesSection,
  Sidebar,
  Divider,
  DevViewToggle,
  MobileMapButton,
} from "@/components";

export default function DetailsPage() {
  const [viewType, setViewType] = useState<"pre-launch" | "builder-unit" | "apartment">("pre-launch");

  return (
    <div className="min-h-screen bg-white">
      {/* Toggle for View Types - DEV ONLY */}
      <DevViewToggle viewType={viewType} setViewType={setViewType} />

      <div className="w-full mx-auto">
        <Navbar />

        {/* 
            Navbar Height Calculation:
            Mobile/Tablet: Header (64px) + Nav (56px) = 120px
            Desktop: Nav (56px)
        */}
        <main className="w-full pt-[120px] lg:pt-[56px] px-[15px] md:px-[32px] lg:px-[48px]">
          {/* Breadcrumb Section 
              Mobile/Tablet: 5px from Navbar
              Desktop: 12px from Navbar
          */}
          <section className="pt-[5px] pb-[8px] lg:pt-[12px] lg:pb-3">
            <Breadcrumb />
          </section>

          <section className="mb-[22.5px] md:mb-[36px] lg:mb-[48px]">
            <ImageGallery />
          </section>

          <section className="flex gap-12">
            <div className="flex-1 flex flex-col lg:max-w-[65%] min-w-0 px-[12px]">
              <div id="overview" className="w-full min-w-0 flex flex-col">
                <PropertyHeader className="mb-[20px] lg:mb-[28px]" />

                <PropertyFeaturesRow className="mb-[20px] md:mb-[36px] lg:mb-[44px]" />

                <MobileMapButton />
                
                <Divider className="mb-[36px] lg:mb-[44px]" />

                {viewType === "builder-unit" ? (
                  <BuilderUnitOverview className="w-full min-w-0 mb-[30px] lg:mb-[44px]" />
                ) : (
                  <OverviewSection className="w-full min-w-0 mb-[30px] lg:mb-[44px]" />
                )}
              </div>

              <Divider className="mb-[30px] lg:mb-[44px]" />

              <UnitPlansSection id="unit-plans" className="mb-[30px] lg:mb-[44px]" />

              {viewType !== "apartment" && (
                <>
                  <Divider className="mb-[30px] lg:mb-[44px]" />

                  <MasterPlanSection id="master-plan" className="mb-[30px] lg:mb-[44px]" />

                  <Divider className="mb-[30px] lg:mb-[44px]" />

                  <LocationSection id="locality" className="mb-[30px] lg:mb-[44px]" />

                  <Divider className="mb-[30px] lg:mb-[44px]" />

                  <AmenitiesSection id="amenities" />

                  {viewType === "builder-unit" && (
                    <>
                      <Divider className="my-[30px] lg:my-[44px]" />
                      <BuilderInfoSection />
                    </>
                  )}
                </>
              )}
            </div>

            <div className="hidden lg:block">
              <Sidebar />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
