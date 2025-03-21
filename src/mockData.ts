import { Client, Pet } from "@/types";

export const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Jan",
    lastName: "Kowalski",
    phone: "+48 123 456 789",
    email: "jan.kowalski@example.com",
    salonId: "1",
  },
  {
    id: "2",
    firstName: "Anna",
    lastName: "Nowak",
    phone: "+48 987 654 321",
    email: "anna.nowak@example.com",
    salonId: "1",
  },
];

export const mockPets: Pet[] = [
  {
    id: "1",
    name: "Burek",
    breed: "Owczarek niemiecki",
    birthDate: "2020-01-15",
    weight: 35,
    clientId: "08dd6706-c522-30c6-9102-b0d90b0427c5",
    salonId: "1",
    notes: [
      {
        id: "1",
        text: "Wymaga szczególnej uwagi przy strzyżeniu uszu",
        createdAt: "2024-03-20T10:00:00Z",
        updatedAt: "2024-03-20T10:00:00Z",
        createdBy: "1",
      },
    ],
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Golden Retriever",
    birthDate: "2021-06-20",
    weight: 28,
    clientId: "08dd6706-c522-30c6-9102-b0d90b0427c5",
    salonId: "1",
    notes: [],
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "3",
    name: "Maks",
    breed: "Yorkshire Terrier",
    birthDate: "2022-03-10",
    weight: 3.5,
    clientId: "08dd6706-c522-30c6-9102-b0d90b0427c5",
    salonId: "1",
    notes: [
      {
        id: "2",
        text: "Alergia na niektóre szampony",
        createdAt: "2024-03-20T10:00:00Z",
        updatedAt: "2024-03-20T10:00:00Z",
        createdBy: "1",
      },
    ],
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
];
