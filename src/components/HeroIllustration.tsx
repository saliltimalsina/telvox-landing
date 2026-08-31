"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

/**
 * The source site plays this animation at half speed (`speed: .5` in its
 * bundle). At 1x the cards fly across noticeably too fast.
 */
const PLAYBACK_SPEED = 0.5;

export default function HeroIllustration() {
  const [data, setData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    fetch("/lottie/hero.json")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  /**
   * Pin the speed whenever the animation instance is (re)built. A one-shot
   * effect keyed on `data` raced lottie-web creating the instance, so on some
   * loads / fast-refreshes setSpeed landed on nothing and the clip ran at full
   * 1x — that's the intermittent "too fast". onDOMLoaded/onDataReady fire once
   * the instance exists, and the effect below covers the already-ready case.
   */
  const applySpeed = () => lottieRef.current?.setSpeed(PLAYBACK_SPEED);

  useEffect(() => {
    if (data) applySpeed();
  }, [data]);

  if (!data) {
    return <div className="aspect-[2500/1160] w-full" />;
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={data}
      loop
      autoplay
      onDOMLoaded={applySpeed}
      onDataReady={applySpeed}
      className="w-full"
      aria-hidden="true"
    />
  );
}
