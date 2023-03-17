import ExpenseStatistics from "../../components/expenses/ExpenseStatistics";
import Chart from "../../components/expenses/Chart";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
];

export default function Analysis() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
