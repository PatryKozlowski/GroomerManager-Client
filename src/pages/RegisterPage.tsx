import RegisterStepperContent from "@/components/stepper/register/RegisterStepperContent";
import RegisterStepperIndicator from "@/components/stepper/register/RegisterStepperIndicator";

function RegisterPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="md:text-3xl text-2xl font-bold text-groomer-dark mb-2">
          Stwórz salon w Groomer Manager
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Wypełnij formularz ponizej aby stworzyć konto i salon
        </p>
      </div>

      <RegisterStepperIndicator />
      <RegisterStepperContent />
    </div>
  );
}

export default RegisterPage;
