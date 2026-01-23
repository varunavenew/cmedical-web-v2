export const TaglineBanner = () => {
    return (
      <div className="w-full bg-accent py-3 md:py-4">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-[10px] md:text-xs lg:text-sm tracking-wide text-accent-foreground font-light">
            Nordens ledende klinikk for{" "}
            <span className="relative inline-block">
              livet og underlivet
              <span className="absolute bottom-0 left-0 w-full h-px bg-accent-foreground" />
            </span>
          </p>
        </div>
      </div>
    );
  };
  