import "@/styles/tailwind.css";
import "focus-visible";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { Geist, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ChatWidget } from "@/components/ChatWidget";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-[9999] h-[3px] transition-all duration-100"
      style={{
        width: `${pct}%`,
        background: "linear-gradient(90deg, #6EE7B7, #818CF8)",
      }}
    />
  );
}

function CursorSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden transition-opacity duration-300 md:block"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(110,231,183,0.06), transparent 40%)`,
      }}
    />
  );
}

function usePrevious(value) {
  let ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function PageLoader() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    setVisible(true);
    setProgress(15);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timerRef.current);
          return 90;
        }
        return prev + Math.random() * 12;
      });
    }, 200);
  }, []);

  const done = useCallback(() => {
    clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 500);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
      clearInterval(timerRef.current);
    };
  }, [router, start, done]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className={`page-loader ${progress >= 100 ? "done" : ""}`}
      style={{ width: `${progress}%` }}
    />
  );
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname);

  useEffect(() => {
    const handler = () => window.scrollTo({ top: 0 });
    router.events.on("routeChangeComplete", handler);
    return () => router.events.off("routeChangeComplete", handler);
  }, [router]);

  return (
    <div className={`${geist.variable} ${jetbrainsMono.variable}`}>
      <ScrollProgress />
      <CursorSpotlight />
      <PageLoader />
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              exit={{
                opacity: 0,
                y: -16,
                transition: {
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <Component previousPathname={previousPathname} {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <ChatWidget />
      <Analytics />
    </div>
  );
}
