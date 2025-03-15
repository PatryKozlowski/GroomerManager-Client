import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import registerStepperReducer from "@/redux/store/registerStepper/registerStepperSlice";
import AccountStep from "@/components/stepper/register/steps/AccountStep";

vi.mock("@/redux/store/registerStepper/registerStepperSlice", async () => {
  const actual = await vi.importActual(
    "@/redux/store/registerStepper/registerStepperSlice"
  );
  return {
    ...actual,
    nextStep: vi.fn(),
    updateData: vi.fn(),
  };
});

const renderComponent = (preloadedState = {}) => {
  const user = userEvent.setup();
  const store = configureStore({
    reducer: { registerStepper: registerStepperReducer },
    preloadedState,
  });

  return {
    user,
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <AccountStep />
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe("AccountStep Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders the account creation form", () => {
      renderComponent();
      expect(screen.getByText("Stwórz swoje konto")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Hasło")).toBeInTheDocument();
      expect(screen.getByLabelText("Powtórz hasło")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Dalej/i })
      ).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    test("validate empty email field", async () => {
      const { user } = renderComponent();
      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      expect(
        await screen.findByText("Adres email jest wymagany")
      ).toBeInTheDocument();
    });

    test("validates email format", async () => {
      const { user } = renderComponent();
      await user.type(screen.getByLabelText("Email"), "invalid-email");
      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      expect(
        await screen.findByText("Podaj poprawny adres email")
      ).toBeInTheDocument();
    });

    test("validate password length", async () => {
      const { user } = renderComponent();
      await user.type(screen.getByLabelText("Hasło"), "short");
      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      expect(
        await screen.findByText("Hasło musi mieć minimum 8 znaków")
      ).toBeInTheDocument();
    });

    test("password must contain uppercase letter", async () => {
      const { user } = renderComponent();
      await user.type(screen.getByLabelText("Hasło"), "lowercase");
      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      expect(
        await screen.findByText(
          "Hasło musi zawierać małą i dużą literę oraz cyfrę"
        )
      ).toBeInTheDocument();
    });

    test("password must contain special character", async () => {
      const { user } = renderComponent();
      await user.type(
        screen.getByLabelText("Hasło"),
        "passwordWithoutSpecialChar2"
      );
      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      expect(
        await screen.findByText("Hasło musi zawierać znak specjalny")
      ).toBeInTheDocument();
    });

    test("validation disappears after entering correct data", async () => {
      const { user } = renderComponent();

      await user.type(screen.getByLabelText("Email"), "invalid-email");
      await user.type(screen.getByLabelText("Hasło"), "short");
      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      expect(
        await screen.findByText("Podaj poprawny adres email")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Hasło musi mieć minimum 8 znaków")
      ).toBeInTheDocument();

      await user.clear(screen.getByLabelText("Email"));
      await user.type(screen.getByLabelText("Email"), "test@example.com");

      await user.clear(screen.getByLabelText("Hasło"));
      await user.type(screen.getByLabelText("Hasło"), "Test@123");

      await user.click(screen.getByRole("button", { name: /Dalej/i }));

      await waitFor(() => {
        expect(
          screen.queryByText("Podaj poprawny adres email")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("Hasło musi mieć minimum 8 znaków")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(
            "Hasło musi zawierać małą i dużą literę oraz cyfrę"
          )
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("Hasło musi zawierać znak specjalny")
        ).not.toBeInTheDocument();
      });
    });
  });
});
