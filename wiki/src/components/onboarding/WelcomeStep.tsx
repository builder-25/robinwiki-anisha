interface WelcomeStepProps {
  onNext: () => void;
}

import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Robin logo"
      width={40}
      height={40}
    />
  );
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center">
      <Logo />

      <h1
        className="text-[28px] whitespace-nowrap"
        style={{
          marginTop: 12,
          fontFamily: "var(--font-source-serif-4), 'Source Serif 4', serif",
          fontWeight: 400,
          lineHeight: "35px",
          color: "var(--heading-color)",
        }}
      >
        Robin
      </h1>

      <p
        className="text-[12px] text-center whitespace-nowrap"
        style={{
          marginTop: 20,
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          fontWeight: 500,
          lineHeight: "1.5",
          color: "var(--subtitle-soft)",
        }}
      >
        Your personal wikipedia
      </p>
      <p
        className="text-[12px] text-center whitespace-nowrap"
        style={{
          marginTop: 4,
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          fontWeight: 500,
          lineHeight: "1.5",
          color: "var(--subtitle-soft)",
        }}
      >
        Built from everything you know
      </p>

      <button
        onClick={onNext}
        className="rounded-[2px] text-center text-[14px] font-bold cursor-pointer transition-opacity hover:opacity-90"
        style={{
          marginTop: 90,
          height: 32,
          minWidth: 32,
          maxWidth: 448,
          padding: "4px 12px",
          lineHeight: "20px",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          backgroundColor: "var(--btn-primary-bg)",
          color: "var(--btn-primary-text)",
        }}
      >
        Get Started
      </button>
    </div>
  );
}
