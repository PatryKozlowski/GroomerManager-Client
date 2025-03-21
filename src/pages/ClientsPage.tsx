import DashboardHeader from "@/components/DashboardHeader";
import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Filter, Check } from "lucide-react";
import { useSalonSelector } from "@/hooks/useSalonSelector";
import CreateNewClient from "@/components/CreateNewClient";
import { useGetClientsQuery } from "@/redux/store/clients/clientsApiSlice";
import { useGetParams } from "@/hooks/useGetParams";
import { useSearch } from "@/hooks/useSearch";
import SearchInput from "@/components/inputs/SearchInput";
import ClientCard from "@/components/ClientCard";
import NotFoundClient from "@/components/NotFoundClient";
import RefetchButton from "@/components/buttons/RefetchButton";
import ClientFilterDialog from "@/components/dialogs/ClientFilterDialog";
import { useDialog } from "@/hooks/useDialog";
import { useClientsFilterParams } from "@/hooks/useClientsFilterParams";

function ClientsPage() {
  const { currentSalon } = useSalonSelector();
  const { salonId, page, pageSize } = useGetParams();
  const { searchInput, setSearchInput, debouncedSearch } = useSearch();
  const { isOpen, setIsOpen } = useDialog();
  const { filters, hasActiveFilters, handleApplyFilters } =
    useClientsFilterParams();

  const { data, isFetching, isLoading, refetch } = useGetClientsQuery({
    salonId: salonId || "",
    search: debouncedSearch || undefined,
    page: page ? parseInt(page) : undefined,
    pageSize: pageSize ? parseInt(pageSize) : undefined,
    hasPets: filters.hasPets || undefined,
    hasEmail: filters.hasEmail || undefined,
    lastVisitBefore: filters.lastVisitBefore || undefined,
    lastVisitAfter: filters.lastVisitAfter || undefined,
  });

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <DashboardHeader
            title="Klienci"
            description={`Zarządzaj swoimi klientami w ${
              currentSalon?.name ?? "Twoim salonie"
            }`}
          />
        </div>

        <CreateNewClient />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchInput
          isFetching={isFetching}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <div className="flex gap-2">
          <Button
            variant={hasActiveFilters ? "default" : "outline"}
            size="icon"
            title="Filter clients"
            onClick={() => setIsOpen(true)}
            className="relative"
          >
            <Filter className="h-4 w-4" />
            {hasActiveFilters && (
              <Check className="absolute -top-1 -right-1 h-3 w-3 bg-primary text-primary-foreground rounded-full p-0.5" />
            )}
          </Button>
          <RefetchButton onRefetch={refetch} title="Refresh client list" />
        </div>
      </div>

      {data?.totalCount !== 0 && (
        <div className="flex text-muted-foreground text-sm items-center">
          <span>{data?.totalCount} klientów</span>
        </div>
      )}

      {isLoading || isFetching ? (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <Spinner />
        </div>
      ) : (
        <div className="flex text-muted-foreground text-sm items-center">
          {data?.totalCount === 0 ? (
            <div className="w-full">
              <NotFoundClient />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mx-auto sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {data?.clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          )}
        </div>
      )}

      <ClientFilterDialog
        open={isOpen}
        isLoading={isLoading}
        setOpen={setIsOpen}
        onApplyFilters={handleApplyFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </>
  );
}

export default ClientsPage;
