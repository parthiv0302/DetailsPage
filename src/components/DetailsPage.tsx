"use client";

import { useState, useMemo } from "react";
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
  SimilarPropertiesSection,
} from "@/components";

export default function DetailsPage() {
  const [viewType, setViewType] = useState<"pre-launch" | "builder-unit" | "apartment" | "unit-plan">("pre-launch");

  return (
    <div className="min-h-screen bg-white">
      {/* Toggle for View Types - DEV ONLY */}
      <DevViewToggle viewType={viewType} setViewType={setViewType} />

      <div className="w-full mx-auto">
        <Navbar viewType={viewType} />

        <main className="w-full pt-[120px] lg:pt-14 px-4 md:px-8 lg:px-12">
          <section className="pt-1 pb-2 lg:pt-3 lg:pb-3">
            <Breadcrumb />
          </section>

          <section className="mb-6 md:mb-9 lg:mb-12">
            <ImageGallery />
          </section>

          <section className="flex gap-12">
            <div className="flex-1 flex flex-col lg:max-w-[65%] min-w-0 px-3">
              <div id="overview" data-section="overview" data-nav-label={viewType === "unit-plan" ? "Unit Overview" : "Overview"} className="w-full min-w-0 flex flex-col">
                <PropertyHeader className="mb-5 lg:mb-7" />

                <PropertyFeaturesRow className="mb-5 md:mb-9 lg:mb-11" />

                <MobileMapButton />
                
                {viewType === "builder-unit" && (
                  <>
                    <Divider className="mb-9 lg:mb-11" />
                    <OverviewSection className="w-full min-w-0 mb-8 lg:mb-11" />
                  </>
                )}
                
                <Divider className="mb-9 lg:mb-11" />

                {viewType === "builder-unit" ? (
                  <BuilderUnitOverview className="w-full min-w-0 mb-8 lg:mb-11" />
                ) : (
                  <OverviewSection 
                    className="w-full min-w-0 mb-8 lg:mb-11" 
                    title={viewType === "unit-plan" ? "Unit Overview" : "Overview"}
                  />
                )}
              </div>

              <Divider className="mb-8 lg:mb-11" />

              <UnitPlansSection 
                id="unit-plans" 
                data-section="unit-plans" 
                data-nav-label="Unit Plans" 
                className="mb-8 lg:mb-11" 
              />

              {viewType !== "apartment" && (
                <>
                  <Divider className="mb-8 lg:mb-11" />

                  <MasterPlanSection 
                    id="master-plan" 
                    data-section="master-plan" 
                    data-nav-label="Master Plan" 
                    className="mb-8 lg:mb-11" 
                  />

                  <Divider className="mb-8 lg:mb-11" />

                  <LocationSection 
                    id="locality" 
                    data-section="locality" 
                    data-nav-label="Locality" 
                    className="mb-8 lg:mb-11" 
                  />

                  <Divider className="mb-8 lg:mb-11" />

                  <AmenitiesSection 
                    id="amenities" 
                    data-section="amenities" 
                    data-nav-label="Amenities" 
                  />

                  {viewType === "builder-unit" && (
                    <>
                      <Divider className="my-8 lg:my-11" />
                      <BuilderInfoSection />
                    </>
                  )}
                </>
              )}

              {/* <Divider className="mb-8 lg:mb-11" />
              <SimilarPropertiesSection 
                id="similar-property" 
                data-section="similar-property" 
                data-nav-label="Similar Property" 
                className="mb-8 lg:mb-11" 
              /> */}
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
