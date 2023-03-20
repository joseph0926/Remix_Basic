// /expenses => shared layout
import { Outlet, Link, useLoaderData } from "@remix-run/react";

import ExpensesList from "~/components/expenses/ExpensesList";
import { getAllExpenses } from "./data/expenses.server";
import { FaDownload, FaPlus } from "react-icons/fa";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expenses</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No Expenses Data</h1>
            <p>
              Start <Link to="add">adding Someting!</Link>
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader() {
  const expenses = await getAllExpenses();
  return expenses;
}
