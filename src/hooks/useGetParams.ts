import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useSalonSelector } from "@/hooks/useSalonSelector";

export function useGetParams() {
  const [searchParams] = useSearchParams();
  const salonId = searchParams.get("salonId");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentSalon } = useSalonSelector();
  const currentPath = location.pathname;
  const params = useParams();

  useEffect(() => {
    if (!salonId) {
      const params = new URLSearchParams(location.search);
      params.set("salonId", currentSalon!.id);
      navigate(`${currentPath}?${params.toString()}`, { replace: true });
    }
  }, [salonId, currentSalon, currentPath, navigate, location.search]);

  return { salonId, search, page, pageSize, params };
}
