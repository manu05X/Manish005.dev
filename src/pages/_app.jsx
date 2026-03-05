import "@/styles/tailwind.css";
import "focus-visible";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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
    <>
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
      <Analytics />
    </>
  );
}
