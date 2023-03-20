// /expenses/raw

import { getAllExpenses } from "./__app/data/expenses.server";

export function loader() {
  return getAllExpenses();
}
