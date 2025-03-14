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
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFromSchema } from "@/schemas";
import { Link } from "react-router";

function LoginPage() {
  const form = useForm<z.output<typeof LoginFromSchema>>({
    resolver: zodResolver(LoginFromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.output<typeof LoginFromSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="md:text-3xl text-2xl font-bold mb-2">
          Zaloguj się do Groomer Manager
        </h2>
        <p className="text-gray-600 dark:text-gray-400 md:text-lg">
          Wypełnij formularz poniżej aby zalogować się do Groomer Manager
        </p>
      </div>

      <Card className="w-[350px] md:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Stwórz swoje konto
          </CardTitle>
          <CardDescription className="text-center">
            Wprowadz adres email oraz hasło
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <PasswordInput field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Zaloguj się
              </Button>
              <div className="text-center">
                <span>
                  Nie masz jeszcze konta?{" "}
                  <Link
                    to="/register"
                    className="text-primary underline hover:text-primary/70 transition-colors duration-300"
                  >
                    Zarejestruj się
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
