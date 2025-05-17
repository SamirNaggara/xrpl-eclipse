import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
  badgeColor: "public" | "owner" | "brand";
  data: unknown;
};

export default function Section({ title, badgeColor, data }: Props) {
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={clsx("px-2 py-1 rounded text-xs font-semibold", {
            "bg-public text-white": badgeColor === "public",
            "bg-owner text-white": badgeColor === "owner",
            "bg-brand text-white": badgeColor === "brand",
          })}
        >
          {title}
        </span>
      </div>
      <pre className="text-xs bg-gray-50 rounded p-2 overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
