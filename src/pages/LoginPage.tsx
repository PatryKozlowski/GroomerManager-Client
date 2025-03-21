import AuthLayoutHeader from "@/components/layouts/AuthLayoutHeader";
import LoginForm from "@/components/forms/LoginForm";

function LoginPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col md:gap-6 md:justify-center items-center md:h-full">
      <AuthLayoutHeader
        title="Zaloguj się do Groomer Manager"
        description="Wypełnij formularz poniżej aby zalogować się do Groomer Manager"
      />

      <LoginForm />
    </div>
  );
}

export default LoginPage;
