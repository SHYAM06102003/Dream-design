import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Form field.
 * A field outline carries meaning, so it uses `border.secondary` (7.23:1)
 * rather than the decorative `border.default`. Focus is a 2px accent ring
 * plus a black border, never `outline: none` on its own.
 */
const fieldBase =
  "w-full rounded-sm border border-secondary bg-surface px-4 py-3 text-body text-primary transition-colors duration-fast ease-standard placeholder:text-secondary hover:border-primary focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/*
 * Form controls carry `suppressHydrationWarning`: password managers and form
 * fillers (e.g. ones that add `fdprocessedid`) write attributes onto inputs and
 * buttons before React hydrates. It only silences attribute differences on that
 * one element; real mismatches in its children are still reported.
 */
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
        suppressHydrationWarning
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
        suppressHydrationWarning
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
