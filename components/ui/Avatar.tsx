"use client";

import { useState } from "react";
import { asset } from "@/lib/basePath";

type Props = {
  src: string;
  name: string;
};

/** Profile image that falls back to initials when the asset is absent. */
export function Avatar({ src, name }: Props) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  if (failed) {
    return (
      <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface to-bg-elevated">
        <span className="font-display text-6xl font-bold text-gradient-gold sm:text-7xl">
          {initials}
        </span>
      </div>
    );
  }

  return (
    // Static export disables the Image optimizer, so a plain img avoids the extra layer.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt={name}
      onError={() => setFailed(true)}
      className="size-full object-cover"
    />
  );
}
