import AuthLayoutHeader from "@/components/layouts/AuthLayoutHeader";
import RegisterStepperContent from "@/components/stepper/register/RegisterStepperContent";
import RegisterStepperIndicator from "@/components/stepper/register/RegisterStepperIndicator";

function RegisterPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col md:gap-6 md:justify-center items-center md:h-full">
      <AuthLayoutHeader
        title="Stwórz salon w Groomer Manager"
        description="Wypełnij formularz ponizej aby stworzyć konto i salon"
      />

      <RegisterStepperIndicator />
      <RegisterStepperContent />
    </div>
  );
}

export default RegisterPage;
