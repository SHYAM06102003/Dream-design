import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Form field — slate-media-house/components/list.md §5 and README §1.
 * A field outline carries meaning, so it uses `border.secondary` (7.23:1)
 * rather than the decorative `border.default`. Focus is a 2px accent ring
 * plus a black border, never `outline: none` on its own.
 */
const fieldBase =
  "w-full rounded-sm border border-secondary bg-surface px-4 py-3 text-body text-primary transition-colors duration-fast ease-standard placeholder:text-secondary hover:border-primary focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const labelBase = "block text-caption font-medium text-secondary";

type FieldWrapperProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, hint, required, className, children }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className={labelBase}>
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-caption text-accent" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-caption text-secondary">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function TextField({ id, label, error, hint, className, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={props.required}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(fieldBase, error && "border-accent", className)}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaProps = Omit<ComponentProps<"textarea">, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function TextArea({ id, label, error, hint, className, ...props }: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={props.required}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(fieldBase, "resize-y", error && "border-accent", className)}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<ComponentProps<"select">, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  options: readonly string[];
  placeholder?: string;
};

export function SelectField({
  id,
  label,
  error,
  hint,
  options,
  placeholder = "Select",
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={props.required}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            fieldBase,
            "cursor-pointer appearance-none pr-10",
            error && "border-accent",
            className,
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 8"
          className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-secondary"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.3}
          aria-hidden="true"
        >
          <path d="M1 1.5 6 6.5l5-5" />
        </svg>
      </div>
    </FieldShell>
  );
}

type CheckboxGroupProps = {
  legend: string;
  options: { id: string; label: string }[];
  value: string[];
  onChange: (next: string[]) => void;
  error?: string;
  columns?: 1 | 2 | 3;
};

/** Multi-select service picker, presented as a quiet grid of tappable options. */
export function CheckboxGroup({
  legend,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: CheckboxGroupProps) {
  return (
    <fieldset className="border-0 p-0">
      <legend className={labelBase}>
        {legend}
        <span className="ml-1 text-accent" aria-hidden="true">
          *
        </span>
      </legend>

      <div
        className={cn(
          "mt-4 grid gap-2.5",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-3",
        )}
      >
        {options.map((option) => {
          const checked = value.includes(option.id);
          const inputId = `service-${option.id}`;
          return (
            <label
              key={option.id}
              htmlFor={inputId}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-caption transition-colors duration-fast ease-standard",
                checked
                  ? "border-primary bg-primary text-inverse-strong"
                  : "border-secondary text-primary hover:border-primary",
              )}
            >
              <input
                id={inputId}
                type="checkbox"
                name="services"
                value={option.id}
                checked={checked}
                onChange={() =>
                  onChange(
                    checked
                      ? value.filter((item) => item !== option.id)
                      : [...value, option.id],
                  )
                }
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center border transition-colors duration-fast",
                  checked ? "border-surface bg-surface" : "border-secondary peer-focus-visible:outline-2",
                )}
              >
                {checked ? (
                  <svg viewBox="0 0 12 10" className="size-3 text-primary" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M1 5.2 4.4 8.6 11 1.4" />
                  </svg>
                ) : null}
              </span>
              <span className="peer-focus-visible:underline peer-focus-visible:underline-offset-4">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p className="mt-3 text-caption text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
