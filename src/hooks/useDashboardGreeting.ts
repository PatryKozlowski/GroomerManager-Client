const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();
  switch (true) {
    case hours >= 5 && hours < 12:
      return "Dzień dobry";
    case hours >= 12 && hours < 18:
      return "Miłego popołudnia";
    default:
      return "Dobry wieczór";
  }
};

export function useDashboardGreeting() {
  const greeting = getGreeting();
  return greeting;
}
