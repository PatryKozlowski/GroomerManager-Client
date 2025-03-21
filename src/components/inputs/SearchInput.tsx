import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchInput({
  isFetching,
  searchInput,
  setSearchInput,
}: {
  isFetching: boolean;
  searchInput: string;
  setSearchInput: (value: string) => void;
}) {
  return (
    <div className="relative flex-1">
      {isFetching && searchInput !== "" ? (
        <Loader2 className="absolute left-2.5 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      )}
      <Input
        type="search"
        placeholder="Szukaj klienta po imieniu, nazwisku lub numerze telefonu"
        className="w-full pl-9"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
