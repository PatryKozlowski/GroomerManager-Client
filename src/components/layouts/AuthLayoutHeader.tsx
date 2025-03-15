interface AuthLayoutHeaderProps {
  title: string;
  description: string;
}

function AuthLayoutHeader({ title, description }: AuthLayoutHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="md:text-3xl text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default AuthLayoutHeader;
