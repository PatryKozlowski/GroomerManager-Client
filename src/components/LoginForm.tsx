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
import Spinner from "@/components/loaders/Spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFromSchema } from "@/schemas";
import { Link, useNavigate } from "react-router";
import { loginThunk } from "@/redux/store/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const form = useForm<z.output<typeof LoginFromSchema>>({
    resolver: zodResolver(LoginFromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.output<typeof LoginFromSchema>) => {
    dispatch(loginThunk(values)).then((data) => {
      if (data.payload) {
        navigate("/dashboard");
      }
    });
  };
  return (
    <Card className="w-[350px] md:w-1/2">
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
