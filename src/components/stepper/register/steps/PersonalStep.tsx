import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import RegisterStepperNav from "../RegisterStepperNav";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterStepperPersonalSchema } from "@/schemas";
import type { RegisterData } from "@/types";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  updateData,
} from "@/redux/store/registerStepper/registerStepperSlice";
import NameInput from "@/components/inputs/NameInput";
import PhoneInput from "@/components/inputs/PhoneInput";

function PersonalStep() {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.output<typeof RegisterStepperPersonalSchema>>({
    resolver: zodResolver(RegisterStepperPersonalSchema),
    defaultValues: {
      firstName: registerState.data.personal.firstName,
      lastName: registerState.data.personal.lastName,
      phone: registerState.data.personal.phone,
    },
  });

  const onSubmit = (values: Partial<RegisterData["personal"]>) => {
    dispatch(updateData({ stepKey: "personal", values }));
    dispatch(nextStep());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Informacje o właścicielu
        </CardTitle>
        <CardDescription className="text-center">
          Opowiedz nam trochę o sobie
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <NameInput
                    label="Imię"
                    placeholder="Jan"
                    field={field}
                    inlineInputsShowError={!!form.formState.errors.firstName}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <NameInput
                    label="Nazwisko"
                    placeholder="Kowalski"
                    field={field}
                    inlineInputsShowError={!!form.formState.errors.lastName}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => <PhoneInput field={field} />}
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

export default PersonalStep;
