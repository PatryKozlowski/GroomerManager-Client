import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import EditClientDialog from "@/components/dialogs/EditClientDialog";
import { useDialog } from "@/hooks/useDialog";
import { useGetClientQuery } from "@/redux/store/clients/clientsApiSlice";
import { useGetParams } from "@/hooks/useGetParams";
import NoAccessToClientDetails from "@/components/NoAccessToClientDetails";
import Spinner from "@/components/loaders/Spinner";
import PetList from "@/components/PetList";
function ClientPage() {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useDialog();
  const { params, salonId } = useGetParams();

  const {
    data: client,
    isError,
    isLoading,
  } = useGetClientQuery({
    salonId: salonId!,
    clientId: params.id!,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <Spinner />
      </div>
    );
  }

  if (isError || !client) {
    return <NoAccessToClientDetails />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót do klientów
        </Button>

        <div className="flex gap-2">
          <EditClientDialog open={isOpen} setOpen={setIsOpen} />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Client</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <PetList clientId={client.id} />
    </div>
  );
}

export default ClientPage;

{
  /* <Card>
<CardHeader className="pb-3">
  <div className="flex gap-4 items-center">
    <Avatar className="border h-16 w-16">
      <AvatarFallback className="text-lg">
        {getInitials(client.firstName + " " + client.lastName)}
      </AvatarFallback>
    </Avatar>
    <div>
      <CardTitle className="text-2xl">
        {client.firstName} {client.lastName}
      </CardTitle>
      <p className="text-muted-foreground text-sm">
        Klient od 12.03.2025
      </p>
    </div>
  </div>
</CardHeader>
<CardContent>
  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <h3 className="font-medium mb-2">Informacje kontaktowe</h3>
      <dl className="space-y-2">
        <div className="flex items-center">
          <dt className="text-muted-foreground text-sm w-20 font-medium">
            Email:
          </dt>
          <dd>{client.email ?? "Brak adresu email"}</dd>
        </div>
        <div className="flex items-center">
          <dt className="text-muted-foreground text-sm w-20 font-medium">
            Telefon:
          </dt>
          <dd>{formatPhoneNumber(client.phone)}</dd>
        </div>
      </dl>
    </div>

    <div>
      <h3 className="font-medium mb-2">Notes</h3>
      {/* {client.notes && client.notes.length > 0 ? ( */
}
// <div className="space-y-2">
{
  /* {client.notes.map((note: ClientNote) => (
          <div key={note.id} className="text-sm">
            <p>{note.text}</p>
            <p className="text-muted-foreground text-xs mt-1">
              {formatDate(note.createdAt)}
            </p>
          </div>
        ))}
      </div>
    ) : ( */
}
// <p className="text-muted-foreground text-sm">
//   No notes available for this client.
// </p>
{
  /* )} */
}
//       </div>
//     </div>
//   </div>
// </CardContent>
// </Card>
