import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        data: new Date(expenseData.date),
      },
    });
    // 데이터베이스에 expense 컬렉션 생성해줌
  } catch (error) {
    console.log(error);
  }
}
