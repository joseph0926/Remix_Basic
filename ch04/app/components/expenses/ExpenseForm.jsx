import {
  Link,
  useActionData,
  useSubmit,
  Form,
  useNavigation,
  useLoaderData,
  useMatches,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationErrors = useActionData();
  // const expenseData = useLoaderData();
  const params = useParams();
  const matches = useMatches();
  const expenses = matches.find((match) => {
    return match.id === "routes/__app/expenses";
  }).data;
  const expenseData = expenses.find((match) => {
    return match.id === params.id;
  });

  const defaultValue = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  // const submit = useSubmit()

  // const submitHandler = (event) => {
  //   event.preventDefault()

  //   // ....

  //   submit(event.target, {
  //     action: "/expenses/add",
  //     method: "post"
  //   });
  // }

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValue.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            defaultValue={
              defaultValue.date ? defaultValue.date.slice(0, 10) : ""
            }
            required
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving,,," : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
