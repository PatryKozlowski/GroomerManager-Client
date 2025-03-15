import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ControllerRenderProps, FormProvider, useForm } from "react-hook-form";
import PasswordInput from "@/components/inputs/PasswordInput";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

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

// Mock the lucide-react components
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    Lock: vi.fn(() => <div data-testid="lucide-lock-icon" />),
    Eye: vi.fn(({ onClick, ...props }) => (
      <div data-testid="lucide-eye-icon" onClick={onClick} {...props} />
    )),
    EyeOff: vi.fn(({ onClick, ...props }) => (
      <div data-testid="lucide-eye-off-icon" onClick={onClick} {...props} />
    )),
  };
});

const mockField: ControllerRenderProps<{ password: string }, "password"> = {
  name: "password",
  value: "",
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
};

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      password: "",
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
            <PasswordInput field={mockField} />
          </FormWrapper>
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe("PasswordInput Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders input field with placeholder", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  test("uses Lock icon from lucide-react library", () => {
    renderComponent();
    expect(screen.getByTestId("lucide-lock-icon")).toBeInTheDocument();
    expect(vi.mocked(Lock)).toHaveBeenCalled();
  });

  test("initially renders with password hidden and EyeOff icon", () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(screen.getByTestId("lucide-eye-off-icon")).toBeInTheDocument();
    expect(vi.mocked(EyeOff)).toHaveBeenCalled();
    expect(screen.queryByTestId("lucide-eye-icon")).not.toBeInTheDocument();
  });

  test("toggles password visibility when eye icon is clicked", async () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toHaveAttribute("type", "password");

    const eyeOffIcon = screen.getByTestId("lucide-eye-off-icon");
    fireEvent.click(eyeOffIcon);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByTestId("lucide-eye-icon")).toBeInTheDocument();
    expect(vi.mocked(Eye)).toHaveBeenCalled();

    expect(screen.queryByTestId("lucide-eye-off-icon")).not.toBeInTheDocument();

    const eyeIcon = screen.getByTestId("lucide-eye-icon");
    fireEvent.click(eyeIcon);

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(screen.getByTestId("lucide-eye-off-icon")).toBeInTheDocument();
  });

  test("validate empty password field", async () => {
    const { user } = renderComponent();

    const passwordInput = screen.getByPlaceholderText("••••••••");
    await user.click(passwordInput);
    await user.tab();

    expect(mockField.onBlur).toHaveBeenCalled();
  });

  test("calls onChange when typing in the password field", async () => {
    const { user } = renderComponent();

    const passwordInput = screen.getByPlaceholderText("••••••••");
    await user.type(passwordInput, "SecurePassword123");
    expect(mockField.onChange).toHaveBeenCalledTimes(17);
  });
});
