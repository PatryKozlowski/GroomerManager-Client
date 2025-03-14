import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/loaders/Spinner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  nextStep,
  prevStep,
} from "@/redux/store/registerStepper/registerStepperSlice";
import { Link } from "react-router";
interface RegisterStepNavProps {
  onSubmit?: () => void;
  isSubmitting?: boolean;
  canProceed?: boolean;
}

function RegisterStepperNav({
  onSubmit,
  isSubmitting = false,
  canProceed = true,
}: RegisterStepNavProps) {
  const registerState = useSelector(
    (state: RootState) => state.registerStepper
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      dispatch(nextStep());
    }
  };

  const isLastStep = registerState.currentStep === registerState.totalSteps - 1;
  const isFirstStep = registerState.currentStep === 0;

  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        onClick={() => dispatch(prevStep())}
        disabled={isFirstStep}
        className={`transition-opacity ${isFirstStep ? "opacity-0" : ""}`}
      >
        <ArrowLeft className="h-4 w-4" />
        Cofnij
      </Button>

      {isFirstStep && (
        <Button variant="outline" asChild className="w-1/2">
          <Link to="/login">Masz już konto? Zaloguj się</Link>
        </Button>
      )}

      <Button
        type={onSubmit ? "submit" : "button"}
        onClick={handleNext}
        disabled={isSubmitting || !canProceed}
      >
        {isSubmitting && <Spinner />}

        {isLastStep ? "Zatwierdź" : "Dalej"}

        {!isLastStep && !isSubmitting ? (
          <ArrowRight className="h-4 w-4" />
        ) : isLastStep && !isSubmitting ? (
          <Check className="h-4 w-4" />
        ) : null}
      </Button>
    </div>
  );
}

export default RegisterStepperNav;
