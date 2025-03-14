import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RegisterStepperNav from "../RegisterStepperNav";
import { Phone, User } from "lucide-react";
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
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input placeholder="Jan" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <div className="min-h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          placeholder="Kowalski"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <div className="min-h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer telefonu</FormLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+48 732 332 734"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
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
