import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  url = "/",
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  url?: string;
}) => {
  const { search } = useLocation();
  const currentTab =
    new URLSearchParams(search).get("roomType") || propTabs[0]?.value;

  const [active, setActive] = useState<Tab>(
    propTabs.find((tab) => tab.value === currentTab) || propTabs[0]
  );

  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollRef.current) {
  //       setIsScrolled(scrollRef.current.scrollLeft > 0);
  //     }
  //   };

  //   scrollRef.current?.addEventListener("scroll", handleScroll);
  //   return () => {
  //     scrollRef.current?.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    // Đồng bộ active tab khi URL thay đổi từ bên ngoài
    const newActive = propTabs.find((tab) => tab.value === currentTab);
    if (newActive) setActive(newActive);
  }, [currentTab, propTabs]);
  return (
    <div className="relative w-full overflow-hidden">
      {/* Tab Navigation */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 flex h-full w-12 flex-row items-center bg-gradient-to-r from-white via-white/50 to-transparent transition-opacity",
          isScrolled ? "opacity-0" : "opacity-100"
        )}
      />
      <div
        ref={scrollRef}
        className={cn(
          "scrollbar-hide relative flex w-full max-w-full items-center overflow-x-auto whitespace-nowrap sm:justify-start md:justify-center",
          containerClassName
        )}
        style={{
          scrollBehavior: "smooth",
          touchAction: "pan-x",
        }}
      >
        {propTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActive(tab);
              navigate(`${url}?roomType=${tab.value}`);
            }}
            className={cn(
              "relative mx-2 flex-shrink-0 rounded-full px-4 py-2 transition",
              tabClassName,
              active.value === tab.value
                ? "font-semibold text-white"
                : "text-black"
            )}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={cn("mt-4", contentClassName)}>
        {active?.content && <div>{active.content}</div>}
      </div>
    </div>
  );
};
