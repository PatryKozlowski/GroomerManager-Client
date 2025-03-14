import React from "react";
import { cn } from "@/lib/utils";
import type { RootState } from "@/redux/store";
import { User2, User, Home, FileCheck, Check } from "lucide-react";
import { useSelector } from "react-redux";

function RegisterStepperIndicator() {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );

  const steps = [
    { name: "Konto", icon: <User2 className="h-5 w-5" /> },
    { name: "Użytkownik", icon: <User className="h-5 w-5" /> },
    { name: "Salon", icon: <Home className="h-5 w-5" /> },
    { name: "Podsumowanie", icon: <FileCheck className="h-5 w-5" /> },
  ];

  return (
    <div className="flex justify-between items-center mb-8 w-full max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                index < registerState.currentStep
                  ? "ring-2 ring-green-500"
                  : index === registerState.currentStep
                  ? "bg-primary dark:text-black text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {index < registerState.currentStep ? (
                <Check className="h-5 w-5 text-green-300" />
              ) : (
                step.icon
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 font-medium",
                index <= registerState.currentStep
                  ? "text-primary"
                  : "text-gray-500"
              )}
            >
              {step.name}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-1 flex-1 mx-2",
                index < registerState.currentStep
                  ? "bg-green-500"
                  : "bg-primary"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default RegisterStepperIndicator;
