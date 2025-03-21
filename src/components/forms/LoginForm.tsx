import EmailInput from "@/components/inputs/EmailInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/inputs/PasswordInput";
import Spinner from "@/components/loaders/Spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFromSchema } from "@/schemas";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/redux/store/auth/authApiSlice";

function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.output<typeof LoginFromSchema>>({
    resolver: zodResolver(LoginFromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: z.output<typeof LoginFromSchema>) => {
    const data = await login(values).unwrap();
    if (data.token) {
      navigate("/dashboard");
    }
  };

  return (
    <Card className="w-[350px] md:w-1/2">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Zaloguj się do swojego konta
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
              render={({ field }) => <EmailInput field={field} />}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => <PasswordInput field={field} />}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              <span className="flex items-center gap-2">
                {isLoading && <Spinner />}
                Zaloguj się
              </span>
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
  );
}

export default LoginForm;
