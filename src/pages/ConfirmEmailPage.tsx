import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";
import { useConfirmEmailMutation } from "@/redux/store/auth/authApiSlice";
import { CircleCheck } from "lucide-react";
import AuthLayoutHeader from "@/components/layouts/AuthLayoutHeader";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/Spinner";
import { useNavigate } from "react-router";
import NewConfirmEmailTokenForm from "@/components/NewConfirmEmailTokenForm";

function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);
  const [confirmEmail, { isLoading, isSuccess, isError }] =
    useConfirmEmailMutation();

  useEffect(() => {
    if (token) {
      confirmEmail({ token });
    }
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, seconds * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccess, navigate, seconds]);

  const handleNavigateNow = () => {
    setSeconds(0);
    navigate("/login");
  };

  if (isError) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthLayoutHeader
        title="Potwierdzenie adresu email"
        description="Witaj w GroomerManager"
      />
      {isLoading && <Spinner />}
      {isSuccess && (
        <div className="p-4 rounded-lg bg-green-100 border border-green-200">
          <div className="flex items-center flex-col">
            <CircleCheck className="h-10 w-10 mr-2 text-green-600 mt-0.5" />
            <div>
              <div className="text-sm text-green-700">
                <p>Email został potwierdzony</p>
                <p>
                  Po {seconds} sekundach zostaniesz przekierowany na stronę
                  główną
                </p>
                <Button
                  className="mt-2 w-full dark:bg-black dark:text-white"
                  onClick={handleNavigateNow}
                >
                  Przenieś teraz
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!token && !isSuccess && !isError && <NewConfirmEmailTokenForm />}
    </div>
  );
}

export default ConfirmEmailPage;
