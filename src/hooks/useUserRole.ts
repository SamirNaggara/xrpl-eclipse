import { useEffect, useState } from "react";
import type { UserRole } from "@/lib/types/product";

export function useUserRole(
  connectedAddress: string | null,
  brandWalletAddress: string
): UserRole {
  const [role, setRole] = useState<UserRole>("public");

  useEffect(() => {
    if (!connectedAddress) {
      setRole("public");
      return;
    }

    // Vérifie si l'adresse connectée correspond à l'adresse de la marque
    if (connectedAddress.toLowerCase() === brandWalletAddress.toLowerCase()) {
      setRole("brand");
    } else {
      setRole("public");
    }
  }, [connectedAddress, brandWalletAddress]);

  return role;
}
