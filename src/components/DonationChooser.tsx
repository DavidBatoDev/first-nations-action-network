"use client";

import { FormEvent, useState } from "react";
import { Arrow } from "@/components/icons";

const amounts = [15, 20, 100] as const;
const frequencies = [
  { value: "once", label: "Once" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Every 3 months" },
] as const;

export default function DonationChooser() {
  const [amount, setAmount] = useState<number>(20);
  const [frequency, setFrequency] = useState("monthly");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const frequencyLabel =
      frequencies.find((item) => item.value === frequency)?.label ?? frequency;
    setNotice(
      `Payment setup is coming soon. Your $${amount} ${frequencyLabel.toLowerCase()} selection has not been charged.`,
    );
  }

  return (
    <form className="donation-chooser" onSubmit={handleSubmit}>
      <span className="mock-label">Donation preview</span>
      <h2>Choose your contribution</h2>

      <fieldset>
        <legend>Amount</legend>
        <div className="amount-options">
          {amounts.map((value) => (
            <label key={value} className={amount === value ? "is-selected" : ""}>
              <input
                type="radio"
                name="amount"
                value={value}
                checked={amount === value}
                onChange={() => {
                  setAmount(value);
                  setNotice("");
                }}
              />
              <span>${value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Frequency</legend>
        <div className="frequency-options">
          {frequencies.map((item) => (
            <label
              key={item.value}
              className={frequency === item.value ? "is-selected" : ""}
            >
              <input
                type="radio"
                name="frequency"
                value={item.value}
                checked={frequency === item.value}
                onChange={() => {
                  setFrequency(item.value);
                  setNotice("");
                }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="donation-summary" aria-live="polite">
        <span>Your selection</span>
        <strong>
          ${amount}{" "}
          {frequency === "once"
            ? "one time"
            : frequencies
                .find((item) => item.value === frequency)
                ?.label.toLowerCase()}
        </strong>
      </div>

      <button type="submit" className="btn btn-primary">
        Continue <Arrow />
      </button>
      <p className="form-note">
        This is a website mockup. No payment details are collected.
      </p>
      {notice ? (
        <p className="mock-notice" role="status">
          {notice}
        </p>
      ) : null}
    </form>
  );
}
