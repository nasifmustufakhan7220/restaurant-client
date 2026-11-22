

// The three inputs of the order form. Needs: itemId.
// Each input has a "name". The form reads the values by these names (no useState needed).

import FormField from "./shared/FormField";

const fieldStyles =
  "min-h-11 w-full rounded-xl border border-border bg-section px-3.5 text-base text-foreground outline-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30 md:text-sm";

const OrderFormFields = ({ itemId }: { itemId: string }) => {
  // Today's date in the user's own time zone, like "2026-11-23". The date picker blocks older days.
  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="grid gap-4">
      {/* Hidden: the person does not see it, but the form sends it with the other values */}
      <input type="hidden" name="itemId" value={itemId} />

      <FormField label="Delivery date" htmlFor="deliveryDate">
        <input
          id="deliveryDate"
          name="deliveryDate"
          type="date"
          min={today}
          required
          className={fieldStyles}
        />
      </FormField>

      <FormField label="Delivery address" htmlFor="deliveryAddress">
        <input
          id="deliveryAddress"
          name="deliveryAddress"
          type="text"
          placeholder="Street, apartment, city"
          autoComplete="street-address"
          required
          className={fieldStyles}
        />
      </FormField>

      <FormField label="Special instructions" htmlFor="message" optionalText="optional">
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={300}
          placeholder="Extra crispy, please..."
          className={`${fieldStyles} resize-y py-3`}
        />
      </FormField>
    </div>
  );
};

export default OrderFormFields;