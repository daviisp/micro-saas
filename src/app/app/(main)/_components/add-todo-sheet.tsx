"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addTodoSchema } from "@/services/schemas/add-todo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, RocketIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTodo } from "../actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type AddTodoSheetProps = {
  countTasks:
    | {
        name: string;
        quota: {
          TASKS: {
            availableTasks: number;
            tasksUsage: number;
            percent: number;
          };
        };
      }
    | undefined;
};

export function AddTodoSheet({ countTasks }: AddTodoSheetProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
  });

  const onSubmit = async (data: z.infer<typeof addTodoSchema>) => {
    try {
      await createTodo(data.title);
      router.refresh();

      toast({
        title: "Success",
        description: "Todo added successfully!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error ocurred. Please try again",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {countTasks?.name === "Free" &&
        countTasks.quota.TASKS.tasksUsage === 5 ? (
          <Button
            disabled
            variant="outline"
            className="mr-5 flex items-center gap-2 font-medium"
          >
            <RocketIcon />
            Upgrade to PRO
          </Button>
        ) : (
          <Button
            variant="outline"
            className="mr-5 flex items-center gap-2 font-medium"
          >
            <PlusIcon />
            Add Todo
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add your task</SheetTitle>
          <SheetDescription>
            Add or edit your todo item here. Click save when you re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-2 py-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                placeholder="Enter your task"
                className="col-span-3 w-[18.75rem]"
                {...form.register("title")}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
