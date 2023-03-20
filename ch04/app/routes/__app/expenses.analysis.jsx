// /expenses/analysis

import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getAllExpenses, getExpense } from "./data/expenses.server";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import Error from "~/components/util/Error";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader() {
  const expenses = await getAllExpenses();

  if (!expenses || expenses.length === 0) {
    throw json({ message: "Could Not load expenses for the requested analysis" }, { status: 404, statusText: "Expenses Not Found" });
  }

  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>{caughtResponse.data?.message || "Could Not load expenses for the requested analysis"}</p>
      </Error>
    </main>
  );
}
