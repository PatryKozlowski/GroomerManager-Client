import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import RegisterStepperNav from "@/components/stepper/register/RegisterStepperNav";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterStepperAccountSchema } from "@/schemas";
import type { RegisterData } from "@/types";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  updateData,
} from "@/redux/store/registerStepper/registerStepperSlice";
import PasswordInput from "@/components/inputs/PasswordInput";
import EmailInput from "@/components/inputs/EmailInput";
function AccountStep() {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.output<typeof RegisterStepperAccountSchema>>({
    resolver: zodResolver(RegisterStepperAccountSchema),
    defaultValues: {
      email: registerState.data.account.email,
      password: registerState.data.account.password,
      repeatPassword: registerState.data.account.repeatPassword,
    },
  });

  const onSubmit = (values: Partial<RegisterData["account"]>) => {
    dispatch(updateData({ stepKey: "account", values }));
    dispatch(nextStep());
  };

  return (
    <Card className="w-full">
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
              render={({ field }) => <EmailInput field={field} />}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => <PasswordInput field={field} />}
            />

            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => <PasswordInput field={field} />}
            />

            <RegisterStepperNav
              onSubmit={form.handleSubmit(onSubmit)}
              isSubmitting={form.formState.isSubmitting}
              canProceed={!form.formState.isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AccountStep;
