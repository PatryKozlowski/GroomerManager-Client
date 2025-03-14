import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import type { AppDispatch, RootState } from "@/redux/store";
import { setCurrentSalon } from "@/redux/store/salon/salonSlice";

export function useSalonSelector() {
  const { salons, currentSalon, isLoading } = useSelector(
    (state: RootState) => state.salon
  );
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const salonId = params.get("salonId");

    if (
      salonId &&
      salons.length > 0 &&
      (!currentSalon || salonId !== currentSalon.id)
    ) {
      const salon = salons.find((s) => s.id === salonId);
      if (salon) {
        dispatch(setCurrentSalon(salon));
      }
    }
  }, [salons, currentSalon, location.search, dispatch]);

  useEffect(() => {
    if (currentSalon && !isLoading) {
      const params = new URLSearchParams(location.search);
      const salonIdParam = params.get("salonId");

      if (!salonIdParam) {
        const currentPath = location.pathname;
        params.set("salonId", currentSalon.id);
        navigate(`${currentPath}?${params.toString()}`, { replace: true });
      }
    }
  }, [currentSalon, isLoading, location.pathname, location.search, navigate]);

  const changeSalon = (salonId: string) => {
    const salon = salons.find((salon) => salon.id === salonId);
    if (!salon) return;

    dispatch(setCurrentSalon(salon));

    const currentPath = location.pathname;
    const params = new URLSearchParams(location.search);
    params.set("salonId", salonId);

    navigate(`${currentPath}?${params.toString()}`, { replace: true });
  };

  const showSalonSelectorForOwner = user?.role === "Owner";
  const showSalonSelectorForUser = user?.role === "Staff";

  return {
    salons,
    currentSalon,
    isLoading,
    user,
    showSalonSelectorForOwner,
    showSalonSelectorForUser,
    changeSalon,
  };
}
