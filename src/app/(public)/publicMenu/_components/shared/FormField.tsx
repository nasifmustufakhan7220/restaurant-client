// A label placed above a form input. Needs: label, htmlFor (the id of the input), children (the input).
// Optional: optionalText, for a small gray word like "optional" next to the label.

type FormFieldProps = {
  label: string;
  htmlFor: string;
  optionalText?: string;
  children: React.ReactNode;
};

const FormField = ({ label, htmlFor, optionalText, children }: FormFieldProps) => {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-foreground">
        {label}
        {optionalText && (
          <span className="ml-2 text-xs font-normal text-text-muted">{optionalText}</span>
        )}
      </label>
      {children}
    </div>
  );
};

export default FormField;