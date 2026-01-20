"use client";
import classNames from "classnames";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { LanguagePicker } from "./LanguagePicker";
import { Portal } from "../Portal";
import { BookingPanel } from "../Booking/BookingPanel";
import { PortableTextBlock } from "sanity";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { t } from "@/src/translations/get-translation";
import { BOOKING } from "@/src/translations/booking";
import { CloseIcon } from "../Icons/CloseIcon";
import { trackWithGTM } from "@/src/lib/tracking";

// const TransitionLink: FC<ComponentProps<typeof Link>> = (props) => {
//   const router = useRouter();
//   return (
//     <Link
//       {...props}
//       onClick={(e) => {
//         if (!document.startViewTransition) return;
//         console.log("view transitions!");
//         e.preventDefault();
//         const url = e.currentTarget.href;
//         document.startViewTransition(() => {
//           console.log("starting transition");
//           router.push(url);
//         });
//       }}
//     />
//   );
// };

const StaticMenuItem: FC<
  PropsWithChildren<{
    url: string;
    isOpen: boolean;
    className?: string;
    closeMenu: () => void;
  }>
> = ({ url, isOpen, className, children, closeMenu }) => (
  <Link
    href={url}
    className={classNames(
      "pill bg-white hover:bg-opacity-80 md:flex",
      !isOpen ? "hidden" : "flex",
      className
    )}
    onClick={closeMenu}
  >
    {children}
  </Link>
);

const MenuItem: FC<
  PropsWithChildren<{
    url: string;
    isSelected: boolean;
    isCurrent: boolean;
    isOpen: boolean;
    className?: string;
    closeMenu: () => void;
    about?: PortableTextBlock[];
  }>
> = ({
  url,
  isSelected,
  isCurrent,
  isOpen,
  className,
  children,
  closeMenu,
  about,
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const hoverBoxRef = useRef<HTMLDivElement>(null);
  const [leftPos, setLeftPos] = useState(0);
  const [topPos, setTopPos] = useState(0);

  const calculatePostion = () => {
    const button = buttonRef.current?.getBoundingClientRect();
    const hoverBox = hoverBoxRef.current?.getBoundingClientRect();
    if (button && hoverBox) {
      const left = (hoverBox.width - button.width) / 2;
      const top = hoverBox.height + 20;
      setLeftPos(left);
      setTopPos(top);
    }
  };

  return (
    <div
      onMouseOver={calculatePostion}
      className={classNames(
        "relative w-fit md:flex hover:cursor-pointer group",
        !isOpen ? "hidden" : "flex",
        className
      )}
    >
      <Link
        ref={buttonRef}
        href={url}
        className={classNames(
          "pill w-fit bg-white md:hover:bg-opacity-80 md:hover:backdrop-blur md:flex",
          isSelected && "md:bg-white/50 md:backdrop-blur",
          !isOpen ? "hidden" : "flex",
          className
        )}
        onClick={closeMenu}
      >
        {isSelected && !isCurrent && (
          <span className="opacity-30 mr-10 hidden md:block -mt-2">
            &lsaquo;
          </span>
        )}
        {children}
        {isSelected && isCurrent && (
          <span className="opacity-30 ml-10 hidden md:block">
            <CloseIcon />
          </span>
        )}
      </Link>
      <div
        ref={hoverBoxRef}
        style={{ left: -leftPos, top: -topPos }}
        className={classNames(
          "hidden md:block absolute top-0 w-[262px] px-20 pt-[13px] pb-15 bg-white opacity-0 bg-opacity-50 backdrop-blur rounded-15 transition-opacity duration-slow ease-in-out pointer-events-none",
          !isOpen && "group-hover:md:opacity-100"
        )}
      >
        <div className="line-clamp-3 prose">
          {about && <PortableTextComponent value={[about[0]]} />}
        </div>
      </div>
    </div>
  );
};

export const Menu: FC<
  GlobalSettings & {
    language: string;
  }
> = ({ language, menuCategories, otherCategories, clinics, specialists }) => {
  const navEl = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const params = useParams<{ language: string; path: string[] }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const specialistSlug =
    params.path &&
    params.path[0] === specialists.slug &&
    typeof params.path[1] === "string"
      ? params.path[1]
      : undefined;
  const clinicSlug =
    params.path &&
    params.path[0] === clinics.slug &&
    typeof params.path[1] === "string"
      ? params.path[1]
      : undefined;
  const showBooking = isBookingOpen || searchParams.has("book");
  const bookClinic = showBooking
    ? (searchParams.get("clinic") ?? clinicSlug)
    : null;
  const bookSpecialist = showBooking
    ? (searchParams.get("specialist") ?? specialistSlug)
    : null;

  const parentPageSlug = params.path?.[0];
  const subPageSlug = params.path?.[1];
  const currentCategory = (
    menuCategories as (
      | (typeof menuCategories)[0]
      | (typeof otherCategories)[0]
    )[]
  )
    .concat(otherCategories)
    .find((cat) => cat.slug === parentPageSlug);

  useEffect(() => {
    const handleResize = (e: Event) => {
      if (!navEl.current || !navEl.current.parentElement) return;
      const windowHeight = window.innerHeight;
      const top = windowHeight * 0.95;
      navEl.current.parentElement.style.top = `${Math.round(top)}px`;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setIsOpenFalse = useCallback(() => {
    setIsOpen(false);
    document.getElementById("app")?.removeAttribute("inert");
  }, []);
  const toggleIsOpen = useCallback(
    () =>
      setIsOpen((old) => {
        // add or remove [inert] on #app
        document.getElementById("app")?.toggleAttribute("inert", !old);
        return !old;
      }),
    []
  );

  const handleOpenBooking = useCallback(() => {
    trackWithGTM("booking_menu_start");

    setIsBookingOpen(true);
    setIsOpenFalse();
  }, [setIsOpenFalse]);

  const handleCloseBooking = useCallback(() => {
    trackWithGTM("booking_close");

    const url = new URL(location.href);
    url.searchParams.delete("book");
    url.searchParams.delete("clinic");
    url.searchParams.delete("specialist");
    router.replace(url.toString());
    setIsBookingOpen(false);
  }, [router]);

  return (
    <nav
      className="absolute bottom-0 flex flex-col items-center justify-center gap-10 flex-wrap mx-auto"
      ref={navEl}
    >
      <div className="flex flex-col md:flex-row basis-full gap-10 items-center justify-center order-1">
        {menuCategories.map((cat) => {
          if (cat.hideFromMainMenu) {
            return null;
          }

          return (
            <MenuItem
              key={cat._id}
              url={
                currentCategory === cat && !subPageSlug
                  ? `/${cat.language}`
                  : `/${cat.language}/${cat.slug}`
              }
              isSelected={currentCategory === cat}
              isCurrent={!subPageSlug}
              isOpen={isOpen}
              closeMenu={setIsOpenFalse}
              about={cat.about}
            >
              {cat.title}
            </MenuItem>
          );
        })}

        {otherCategories.map((cat) => {
          if (cat.hideFromMainMenu) {
            return null;
          }

          return (
            <MenuItem
              key={cat._id}
              url={`/${cat.language}/${cat.slug}`}
              isSelected={false}
              isCurrent={false}
              isOpen={isOpen}
              className="md:hidden"
              closeMenu={setIsOpenFalse}
            >
              {cat.title}
            </MenuItem>
          );
        })}

        <div className="flex gap-10 mt-40 md:mt-0">
          {currentCategory && (
            <Link
              className="pill bg-white/50 backdrop-blur md:hidden"
              href={
                currentCategory.slug === parentPageSlug && !subPageSlug
                  ? `/${language}`
                  : `/${language}/${parentPageSlug}`
              }
              onClick={setIsOpenFalse}
            >
              {currentCategory.slug === parentPageSlug &&
                typeof subPageSlug === "string" && (
                  <span className="opacity-30 mr-10 -mt-2">&lsaquo;</span>
                )}
              {currentCategory.title}
              {currentCategory.slug === parentPageSlug && !subPageSlug && (
                <span className="opacity-30 ml-10">
                  <CloseIcon />
                </span>
              )}
            </Link>
          )}
          <button className="bg-yellow pill" onClick={handleOpenBooking}>
            {t(BOOKING, language)}
          </button>
          <button
            onClick={toggleIsOpen}
            className={classNames(
              "pill px-0 w-40 hover:bg-opacity-80",
              isOpen ? "bg-white/50 backdrop-blur" : "bg-white"
            )}
          >
            {" "}
            {!isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                className="mx-auto"
              >
                <path d="M.6 2.2V.5h12v1.7H.5ZM.6 7.8V6.2h12v1.6H.5ZM.6 13.5v-1.7h12v1.7H.5Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                className="mx-auto"
              >
                <path d="M1.63.03.46 1.19l5.98 5.98-5.63 5.64 1.16 1.16 5.64-5.63 5.58 5.58 1.17-1.17-5.58-5.58 5.92-5.92L13.54.08 7.6 6 1.63.03Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className={classNames(
          "flex flex-col md:flex-row gap-10 mb-40 md:mb-0 basis-full items-center justify-center flex-wrap",
          !isOpen && "hidden"
        )}
      >
        <LanguagePicker
          current={language}
          className="order-1 md:order-0"
          selectedClassName="bg-white/50 backdrop-blur"
          direction="down"
        />
        <StaticMenuItem
          url={`/${language}/${clinics.slug}`}
          isOpen={isOpen}
          closeMenu={setIsOpenFalse}
        >
          {clinics.menuTitle}
        </StaticMenuItem>
        <StaticMenuItem
          url={`/${language}/${specialists.slug}`}
          isOpen={true}
          closeMenu={setIsOpenFalse}
        >
          {specialists.menuTitle}
        </StaticMenuItem>
        {otherCategories.map((cat) => {
          if (cat.hideFromMainMenu) {
            return null;
          }

          return (
            <StaticMenuItem
              key={cat._id}
              url={`/${language}/${cat.slug}`}
              isOpen={isOpen}
              className="hidden md:flex"
              closeMenu={setIsOpenFalse}
            >
              {cat.title}
            </StaticMenuItem>
          );
        })}
      </div>
      <Portal>
        {isOpen ? (
          <div
            onClick={toggleIsOpen}
            className={classNames(
              "bg-black/20 backdrop-blur fixed top-0 bottom-0 left-0 right-0 z-40"
            )}
          />
        ) : null}
      </Portal>
      <BookingPanel
        show={showBooking}
        clinicSlug={bookClinic}
        specialistSlug={bookSpecialist}
        onClose={handleCloseBooking}
      />
    </nav>
  );
};
