import EmailInput from "@/components/inputs/EmailInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewConfirmEmailTokenSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/Spinner";
import { CircleCheck } from "lucide-react";
import { useSendConfirmEmailTokenMutation } from "@/redux/store/auth/authApiSlice";

function NewConfirmEmailTokenForm() {
  const form = useForm<z.output<typeof NewConfirmEmailTokenSchema>>({
    resolver: zodResolver(NewConfirmEmailTokenSchema),
    defaultValues: {
      email: "",
    },
  });

  const [sendConfirmEmailToken, { isLoading, isSuccess }] =
    useSendConfirmEmailTokenMutation();

  const onSubmit = (data: z.output<typeof NewConfirmEmailTokenSchema>) => {
    sendConfirmEmailToken(data);
  };
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Wprowadz adres email
          </CardTitle>
          <CardDescription className="text-center">
            Wprowadz adres email aby potwierdzić swoje konto
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="p-4 rounded-lg bg-green-100 border border-green-200">
              <div className="flex items-center flex-col">
                <CircleCheck className="h-10 w-10 mr-2 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-green-700">
                    <p>Email został wysłany</p>
                    <p>Sprawdź swoją skrzynkę email</p>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <EmailInput field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  <span className="flex items-center gap-2">
                    {isLoading && <Spinner />}
                    Wyślij ponowanie
                  </span>
                </Button>
                <div className="text-center flex flex-col gap-2">
                  <span>
                    Nie masz jeszcze konta?{" "}
                    <Link
                      to="/register"
                      className="text-primary underline hover:text-primary/70 transition-colors duration-300"
                    >
                      Zarejestruj się
                    </Link>
                  </span>
                  <span>
                    Masz już konto?{" "}
                    <Link
                      to="/login"
                      className="text-primary underline hover:text-primary/70 transition-colors duration-300"
                    >
                      Zaloguj się
                    </Link>
                  </span>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default NewConfirmEmailTokenForm;
