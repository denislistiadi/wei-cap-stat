"use client";

import { ConfigurationCard } from "@/components/shared/config-card";
import { FeaturesSection } from "@/components/shared/feature-section";
import { HeaderSection } from "@/components/shared/header-section";
import { ResultsCard } from "@/components/shared/result-card";
import { useCaptionGenerator } from "@/hooks/use-caption-generator";

export default function HomePage() {
  const {
    inputText,
    setInputText,
    captions,
    isLoading,
    isCopied,
    generateCaptions,
    handleCopy,
  } = useCaptionGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7fe] to-[#eef4ff] dark:from-[#0f0c29] dark:to-[#302b63] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ConfigurationCard
            inputText={inputText}
            setInputText={setInputText}
            isLoading={isLoading}
            generateCaptions={generateCaptions}
          />

          <ResultsCard
            captions={captions}
            isLoading={isLoading}
            isCopied={isCopied}
            handleCopy={handleCopy}
          />
        </div>

        <FeaturesSection />
      </div>
    </div>
  );
}
