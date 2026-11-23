import React from 'react';
import { ReceiptText } from "lucide-react";
import { getAllPayments } from '@/lib/api/admin';
export type Transaction = {
  _id: string;
  status: string; // the checkout session status: "complete", "open" or "expired"
  payment_status: string; // "paid", "unpaid" or "no_payment_required"
  customer_email: string; // the vendor who paid
  userId: string; // the vendor's user id
  payment_date: string; // like "2026-11-23T15:00:02.285Z"
  payment_intent: string; // Stripe payment id
  sessionId: string; // Stripe checkout session id
};
 
const formatPaymentDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
};

// "no_payment_required" -> "no payment required"
const toWords = (value: string) => value.replace(/_/g, " ");

// The three numbers for the cards at the top, counted from the list
const getStats = (transactions: Transaction[]) => {
  return [
    { label: "Total Transactions", value: transactions.length },
    { label: "Paid", value: transactions.filter((item) => item.payment_status === "paid").length },
    { label: "Not paid", value: transactions.filter((item) => item.payment_status !== "paid").length },
  ];
};

// ---------------------------------------------------------------
// 4) Badge colors. One place to change them
// ---------------------------------------------------------------

type BadgeTone = "success" | "warning" | "danger" | "neutral";

const toneStyles: Record<BadgeTone, string> = {
  success: "bg-pill-success text-success",
  warning: "bg-pill-warning text-warning",
  danger: "bg-pill-danger text-destructive",
  neutral: "bg-section text-text-secondary",
};

// Which color each status gets. A status that is not in the list falls back to "neutral".
const paymentTones: Record<string, BadgeTone> = {
  paid: "success",
  unpaid: "warning",
};

const sessionTones: Record<string, BadgeTone> = {
  complete: "success",
  open: "warning",
  expired: "danger",
};

// A small rounded label. Needs: text and tone.
const StatusBadge = ({ text, tone }: { text: string; tone: BadgeTone }) => {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold capitalize ${toneStyles[tone]}`}
    >
      {toWords(text)}
    </span>
  );
};

// ---------------------------------------------------------------
// 5) Desktop table (hidden below "lg") and mobile cards (hidden from "lg")
// ---------------------------------------------------------------

const tableHeaders = ["Vendor", "Date", "Payment", "Status", "Payment ID"];
const cellStyles = "border-b border-table-border px-4 py-3.5 align-middle";

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    // overflow-x-auto: if the table is wider than the card, only the card scrolls, not the page
    <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card lg:block mt-8">
      <table className="w-full min-w-215 border-collapse text-left">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap border-b border-table-border px-4 py-3.5 text-sm font-semibold text-table-header"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td className={cellStyles}>
                <p className="break-all font-bold text-foreground">{item.customer_email}</p>
                <p className="max-w-55 truncate text-xs text-text-muted" title={item.userId}>
                  ID: {item.userId}
                </p>
              </td>

              <td className={`${cellStyles} whitespace-nowrap text-text-secondary`}>
                {formatPaymentDate(item.payment_date)}
              </td>

              <td className={cellStyles}>
                <StatusBadge text={item.payment_status} tone={paymentTones[item.payment_status] ?? "neutral"} />
              </td>

              <td className={cellStyles}>
                <StatusBadge text={item.status} tone={sessionTones[item.status] ?? "neutral"} />
              </td>

              {/* Long Stripe ids are cut with "..." and the full id shows when the mouse is over it */}
              <td className={cellStyles}>
                <p className="max-w-55 truncate font-mono text-xs text-foreground" title={item.payment_intent}>
                  {item.payment_intent}
                </p>
                <p className="max-w-55 truncate font-mono text-xs text-text-muted" title={item.sessionId}>
                  {item.sessionId}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  // Each row is { label, value }. To show one more detail, add one line here.
  const details = [
    { label: "Date", value: formatPaymentDate(transaction.payment_date) },
    { label: "Payment ID", value: transaction.payment_intent },
    { label: "Session ID", value: transaction.sessionId },
  ];

  return (
    <article className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <div>
        <p className="break-all font-bold text-foreground">{transaction.customer_email}</p>
        <p className="break-all text-xs text-text-muted">ID: {transaction.userId}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <StatusBadge
          text={transaction.payment_status}
          tone={paymentTones[transaction.payment_status] ?? "neutral"}
        />
        <StatusBadge text={transaction.status} tone={sessionTones[transaction.status] ?? "neutral"} />
      </div>

      <dl className="grid gap-2 text-sm">
        {details.map((detail) => (
          <div key={detail.label} className="grid gap-0.5">
            <dt className="text-text-muted">{detail.label}</dt>
            {/* break-all: a very long Stripe id wraps and never widens the card */}
            <dd className="break-all font-mono text-xs text-foreground">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
};


const FirstTranjactions = async () => {
    const transactions: Transaction[] = await getAllPayments();
    const stats = getStats(transactions);
    return (
        <div>
            {/* Three number cards. Grid: 1 column on a small phone, 3 columns from "sm" */}
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {transactions.length > 0 ? (
        <>
          {/* Desktop: table (hidden below "lg") */}
          <TransactionsTable transactions={transactions} />

          {/* Mobile and tablet: cards (hidden from "lg") */}
          <div className="grid gap-3 lg:hidden">
            {transactions.map((item) => (
              <TransactionCard key={item._id} transaction={item} />
            ))}
          </div>

          <p className="text-sm text-text-secondary mt-4">
            Showing {transactions.length} of {transactions.length} transactions
          </p>
        </>
      ) : (
        // Nothing to show yet
        <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-14 text-center">
          <ReceiptText className="mx-auto size-12 text-text-muted" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-bold text-foreground">No transactions yet</h2>
          <p className="mt-1 text-text-secondary">Vendor payments will appear here.</p>
        </div>
      )}
        </div>
    );
};

export default FirstTranjactions;