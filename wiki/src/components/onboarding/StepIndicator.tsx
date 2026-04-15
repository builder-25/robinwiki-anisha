interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-[7px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[6px] w-[28px] transition-colors duration-200"
          style={{
            backgroundColor:
              i === currentStep
                ? "var(--step-active)"
                : "var(--step-inactive)",
          }}
        />
      ))}
    </div>
  );
}
