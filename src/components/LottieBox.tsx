"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

/**
 * Plays one of the site's own Lottie files, fetched at runtime so the JSON
 * never lands in the JS bundle.
 */
export default function LottieBox({
  src,
  speed = 1,
  className = "",
  /** Aspect ratio to reserve before the JSON arrives, e.g. "840/794". */
  ratio,
}: {
  src: string;
  speed?: number;
  className?: string;
  ratio?: string;
}) {
  const [data, setData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    let live = true;
    fetch(src)
      .then((r) => r.json())
      .then((d) => live && setData(d))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [src]);

  useEffect(() => {
    if (data) lottieRef.current?.setSpeed(speed);
  }, [data, speed]);

  if (!data) {
    return (
      <div
        className={className}
        style={ratio ? { aspectRatio: ratio } : undefined}
      />
    );
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={data}
      loop
      autoplay
      className={className}
      aria-hidden="true"
    />
  );
}
