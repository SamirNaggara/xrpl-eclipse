"use client";
import { useState, useTransition } from "react";
import { unlock } from "../actions/unlock";

export default function UnlockForm({ nftId }: { nftId: string }) {
  const [role, setRole] = useState<"owner" | "brand">("owner");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="flex items-center gap-2 mt-4"
      action={async () => {
        startTransition(() => {
          unlock({ nftId, role });
        });
      }}
    >
      <select
        className="border rounded px-2 py-1"
        value={role}
        onChange={(e) => setRole(e.target.value as "owner" | "brand")}
        disabled={isPending}
      >
        <option value="owner">Owner</option>
        <option value="brand">Brand</option>
      </select>
      <button
        type="submit"
        className="bg-black text-white px-3 py-1 rounded disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Déblocage..." : "Débloquer"}
      </button>
    </form>
  );
}
