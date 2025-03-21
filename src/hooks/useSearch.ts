import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetParams } from "@/hooks/useGetParams";

export function useSearch() {
  const { search } = useGetParams();
  const [searchInput, setSearchInput] = useState(search || "");
  const debouncedSearch = useDebounce(searchInput, 500);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [debouncedSearch, location.pathname, location.search, navigate]);

  return {
    searchInput,
    setSearchInput,
    debouncedSearch,
  };
}
