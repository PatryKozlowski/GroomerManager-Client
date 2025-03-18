import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useConfirmEmailMutation } from "@/redux/store/auth/authApiSlice";
import { CircleCheck } from "lucide-react";
import AuthLayoutHeader from "@/components/layouts/AuthLayoutHeader";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/Spinner";
import { useNavigate } from "react-router";
import NewConfirmEmailTokenForm from "@/components/NewConfirmEmailTokenForm";

function ConfirmEmailPage() {
  const param = useSearchParams();
  const token = param[0].get("token");
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);
  const [confirmEmail, { isLoading, isSuccess, isError }] =
    useConfirmEmailMutation();

  useEffect(() => {
    if (token) {
      confirmEmail({ token });
    }
  }, [token, confirmEmail]);

  useEffect(() => {
    if (isSuccess) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      if (seconds === 0) {
        navigate("/login");
      }
      return () => clearInterval(interval);
    }
  }, [isSuccess, navigate, seconds]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthLayoutHeader
        title="Potwierdzenie adresu email"
        description="Witaj w GroomerManager"
      />
      {!token && (
        <div className="p-4 rounded-lg bg-green-100 border border-green-200">
          <div className="flex items-center flex-col">
            <CircleCheck className="h-10 w-10 mr-2 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-green-700">
                <p>Konto zostało utworzone</p>
                <p>Sprawdź swoją skrzynkę email aby aktywować konto</p>
              </p>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {isSuccess && (
        <div className="p-4 rounded-lg bg-green-100 border border-green-200">
          <div className="flex items-center flex-col">
            <CircleCheck className="h-10 w-10 mr-2 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-green-700">
                <p>Email został potwierdzony</p>
                <p>
                  Po {seconds} sekundach zostaniesz przekierowany na stronę
                  główną
                </p>
                <Button
                  className="mt-2 w-full"
                  onClick={() => {
                    setSeconds(0);
                    navigate("/login");
                  }}
                >
                  Przenieś teraz
                </Button>
              </p>
            </div>
          </div>
        </div>
      )}
      {isError && <NewConfirmEmailTokenForm />}
    </div>
  );
}

export default ConfirmEmailPage;
