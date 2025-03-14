import { Input } from "@/components/ui/input";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterStepperSalonSchema } from "@/schemas";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  updateData,
} from "@/redux/store/registerStepper/registerStepperSlice";
import RegisterStepNav from "../RegisterStepperNav";
import { RegisterData } from "@/types";

function SalonStep() {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.output<typeof RegisterStepperSalonSchema>>({
    resolver: zodResolver(RegisterStepperSalonSchema),
    defaultValues: {
      name: registerState.data.salon.name,
    },
  });

  const onSubmit = (values: Partial<RegisterData["salon"]>) => {
    dispatch(
      updateData({
        stepKey: "salon",
        values,
      })
    );
    dispatch(nextStep());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Informacje o salonie
        </CardTitle>
        <CardDescription className="text-center">
          Powiedz nam trochę o swoim salonie
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wpisz nazwę salonu</FormLabel>
                  <FormControl>
                    <Input placeholder="Super nazwa !" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <RegisterStepNav
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

export default SalonStep;
