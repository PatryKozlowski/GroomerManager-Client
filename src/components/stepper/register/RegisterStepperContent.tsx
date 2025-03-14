import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import AccountStep from "@/components/stepper/register/steps/AccountStep";
import PersonalStep from "@/components/stepper/register/steps/PersonalStep";
import SalonStep from "@/components/stepper/register/steps/SalonStep";
import ConfirmationStep from "@/components/stepper/register/steps/ConfirmationStep";

function RegisterStepperContent() {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );
  const steps = [
    <AccountStep key="account" />,
    <PersonalStep key="personal" />,
    <SalonStep key="salon" />,
    <ConfirmationStep key="confirmation" />,
  ];
  return (
    <div className="w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out">
      {steps[registerState.currentStep]}
    </div>
  );
}

export default RegisterStepperContent;
