import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  getByPlaceholderText,
} from "@testing-library/react";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";

jest.mock("axios");

describe("RegistrationForm", () => {
  it("fetches validation rules when password changes", async () => {
    axios.post.mockResolvedValue({
      data: {
        validations: ["Validation 1", "Validation 2"],
      },
    });
    const { findByPlaceholderText } = render(
      <RegistrationForm onAccountCreated={() => {}} />
    );

    // Wait for the password input field to appear
    const passwordInput = await findByPlaceholderText("enter password...");

    // Call from initial render
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    await act(async () => {
      fireEvent.change(passwordInput, {
        target: { value: "new password" },
      });
    });

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/validate", {
      password: "new password",
    });
  });
  // TODO: write a bunch more tests :)
});
