import { Link, Outlet } from "@remix-run/react";

import ExpensesList from "../../components/expenses/ExpensesList";

import { DUMMY_EXPENSES } from "./expenses.analysis";

import { FaDownload, FaPlus } from "react-icons/fa";

export default function ExpensesLayout() {
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
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
