// /expenses => shared layout
import { Outlet, Link, useLoaderData } from "@remix-run/react";

import ExpensesList from "~/components/expenses/ExpensesList";
import { getAllExpenses } from "./data/expenses.server";
import { FaDownload, FaPlus } from "react-icons/fa";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

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
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export async function loader() {
  const expenses = await getAllExpenses();
  return expenses;
}
