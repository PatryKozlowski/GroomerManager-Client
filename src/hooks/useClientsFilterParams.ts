import type { FilterFormData } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";

export function useClientsFilterParams() {
  const [searchParams] = useSearchParams();
  const hasEmail = searchParams.get("hasEmail");
  const hasPets = searchParams.get("hasPets");
  const lastVisitBefore = searchParams.get("lastVisitBefore");
  const lastVisitAfter = searchParams.get("lastVisitAfter");

  const [filters, setFilters] = useState<FilterFormData>({
    hasEmail: hasEmail === "true",
    hasPets: hasPets === "true",
    lastVisitBefore: lastVisitBefore || "",
    lastVisitAfter: lastVisitAfter || "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  console.log("filters", filters);

  useEffect(() => {
    console.log("Filters useEffect", filters);
    const params = new URLSearchParams(location.search);

    if (filters.hasEmail) {
      params.set("hasEmail", "true");
    } else {
      params.delete("hasEmail");
    }

    if (filters.hasPets) {
      params.set("hasPets", "true");
    } else {
      params.delete("hasPets");
    }

    if (filters.lastVisitBefore) {
      params.set("lastVisitBefore", filters.lastVisitBefore);
    } else {
      params.delete("lastVisitBefore");
    }

    if (filters.lastVisitAfter) {
      params.set("lastVisitAfter", filters.lastVisitAfter);
    } else {
      params.delete("lastVisitAfter");
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [filters, location.pathname, location.search, navigate]);

  const hasActiveFilters = Object.values(filters).some((value) => value);

  const handleApplyFilters = async (newFilters: FilterFormData) => {
    setFilters(newFilters);
  };

  return { filters, hasActiveFilters, handleApplyFilters };
}
