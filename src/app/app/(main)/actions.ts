"use server";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";

export async function getAllTodosByUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return todos;
}

export async function createTodo(title: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  await prisma.todo.create({
    data: {
      title,
      createdAt: new Date(),
      userId: session.user.id,
    },
  });
}

export async function findTodo(todoId: string) {
  const todo = await prisma.todo.findFirst({
    where: {
      id: todoId,
    },
  });

  if (!todo) {
    return;
  }

  return todo;
}

export async function updateTodo(todoId: string) {
  const todoAlreadyExists = await findTodo(todoId);

  if (todoAlreadyExists?.doneAt) {
    await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        doneAt: null,
      },
    });
  } else {
    await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        doneAt: new Date(),
      },
    });
  }
}

export async function deleteTodo(todoId: string) {
  const todoAlreadyExists = await findTodo(todoId);

  if (!todoAlreadyExists) {
    return {
      error: "Not found",
      data: null,
    };
  }

  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
}
