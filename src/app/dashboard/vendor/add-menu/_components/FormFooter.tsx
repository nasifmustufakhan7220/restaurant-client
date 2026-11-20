import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// The warning note and the Cancel / Submit buttons at the end of the form.
export default function FormFooter() {
  return (
    <>
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-pill-warning px-3.5 py-3 text-[13px] text-warning sm:mt-5">
        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          New items start with the status <strong>Pending</strong> until an admin
          approves them.
        </span>
      </div>

      <div className="mt-5 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="h-11 w-full rounded-full border border-border bg-transparent text-foreground sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-11 w-full rounded-full px-5 font-semibold sm:w-auto"
        >
          Submit for Approval
        </Button>
      </div>
    </>
  );
}
