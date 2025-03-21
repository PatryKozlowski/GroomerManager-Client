import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RootState } from "@/redux/store";
import { User, Mail, Phone, Building, Check, CircleCheck } from "lucide-react";
import { useSelector } from "react-redux";
import RegisterStepperNav from "@/components/stepper/register/RegisterStepperNav";
import { useCreateAccountMutation } from "@/redux/store/auth/authApiSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
function ConfirmationStep() {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );
  const [createAccount, { isLoading, isSuccess }] = useCreateAccountMutation();

  const handleSubmit = () => {
    createAccount({ data: registerState.data });
  };

  return (
    <>
      {isSuccess ? (
        <div className="p-4 rounded-lg bg-green-100 border border-green-200">
          <div className="grid grid-cols-2">
            <div className=" flex items-center justify-center w-full col-span-2 gap-2">
              <CircleCheck className="h-10 w-10 mr-2 text-green-600 mt-0.5" />
              <p className="text-sm text-green-700">
                <p>Konto zostało utworzone</p>
                <p>Sprawdź swoją skrzynkę email aby aktywować konto</p>
              </p>
            </div>
          </div>
          <Separator className="mt-2 " />
          <div className="flex items-center justify-center col-span-2 gap-2 flex-col">
            <Button variant="link" asChild className=" text-black">
              <Link to="/confirm-email">Link do aktywacji nie działa?</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Podsumowanie</CardTitle>
            <CardDescription className="text-center">
              Proszę sprawdź swoje dane przed potiwerdzeniem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-primary dark:text-black text-white p-4 rounded-lg">
                <h3 className="font-semibold flex items-center mb-2">
                  <User className="h-5 w-5 mr-2" />
                  Informacje o koncie
                </h3>
                <div className="pl-7 space-y-1 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <span>{registerState.data.account.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary dark:text-black text-white p-4 rounded-lg">
                <h3 className="font-semibold flex items-center mb-2 text-groomer-dark">
                  <User className="h-5 w-5 mr-2" />
                  Informacje o uzytkowniku
                </h3>
                <div className="pl-7 space-y-1">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <span>{`${registerState.data.personal.firstName} ${registerState.data.personal.lastName}`}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <span>{registerState.data.personal.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary dark:text-black text-white  p-4 rounded-lg">
                <h3 className="font-semibold flex items-center mb-2 text-groomer-dark">
                  <Building className="h-5 w-5 mr-2" />
                  Informacje o salonie
                </h3>
                <div className="pl-7 space-y-1">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <span>{registerState.data.salon.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-100 border border-green-200">
                <div className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Prawie gotowe!</p>
                    <p className="text-sm text-green-700">
                      Klikając "Zatwierdź" potwierdzasz warunki z korzystania z
                      aplikacji
                    </p>
                  </div>
                </div>
              </div>

              <RegisterStepperNav
                onSubmit={handleSubmit}
                isSubmitting={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ConfirmationStep;
