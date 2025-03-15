import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ControllerRenderProps, FormProvider, useForm } from "react-hook-form";
import EmailInput from "@/components/inputs/EmailInput";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Mail } from "lucide-react";

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

vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    Mail: vi.fn(() => <div data-testid="lucide-mail-icon" />),
  };
});

const mockField: ControllerRenderProps<{ email: string }, "email"> = {
  name: "email",
  value: "",
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
};

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderComponent = (preloadedState = {}) => {
  const user = userEvent.setup();
  const store = configureStore({
    reducer: { dummy: (state = {}) => state },
    preloadedState,
  });

  return {
    user,
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <FormWrapper>
            <EmailInput field={mockField} />
          </FormWrapper>
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe("EmailInput Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders input field with placeholder", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText("konto@groomermanager.pl")
    ).toBeInTheDocument();
  });

  test("uses Mail icon from lucide-react library", () => {
    renderComponent();
    expect(screen.getByTestId("lucide-mail-icon")).toBeInTheDocument();
    expect(vi.mocked(Mail)).toHaveBeenCalled();
  });

  test("validate empty email field", async () => {
    const { user } = renderComponent();

    const emailInput = screen.getByPlaceholderText("konto@groomermanager.pl");
    await user.click(emailInput);
    await user.tab();

    expect(mockField.onBlur).toHaveBeenCalled();
  });

  test("calls onChange when typing in the email field", async () => {
    const { user } = renderComponent();

    const emailInput = screen.getByPlaceholderText("konto@groomermanager.pl");
    await user.type(emailInput, "konto@groomermanager.pl");
    expect(mockField.onChange).toHaveBeenCalledTimes(23);
  });
});
