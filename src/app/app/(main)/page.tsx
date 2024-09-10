import { HorizontalDivider } from "@/components/horizontal-divider";
import { TodoDataTable } from "./_components/todo-data-table";
import { AddTodoSheet } from "./_components/add-todo-sheet";
import { getAllTodosByUser } from "./actions";
import { getPlanByUser } from "../settings/billing/actions";
import { auth } from "@/services/auth";

const Page = async () => {
  const session = await auth();

  if (!session) {
    return;
  }

  const todos = await getAllTodosByUser();
  const countTasks = await getPlanByUser(session?.user?.id);

  return (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="text-lg text-muted-foreground ml-5 my-3.5">TASKS</h2>
        <AddTodoSheet countTasks={countTasks} />
      </header>
      <HorizontalDivider className="w-full border-b" />
      <main className="mx-5">
        <TodoDataTable data={todos!} />
      </main>
    </div>
  );
};
export default Page;
