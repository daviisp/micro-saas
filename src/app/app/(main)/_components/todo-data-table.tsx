"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@/services/types/todo";
import { Badge } from "@/components/ui/badge";
import { deleteTodo, updateTodo } from "../actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const data: Todo[] = [
  {
    id: "m5gr84i9",
    title: "Learn React",
    createdAt: new Date("2024-06-06"),
  },
  {
    id: "s5gr84i9",
    title: "Learn Next.js",
    createdAt: new Date("2024-06-07"),
    doneAt: new Date("2024-08-08"),
  },
  {
    id: "a5gr84i9",
    title: "Learn Angular",
    createdAt: new Date("2024-06-08"),
    doneAt: new Date("2024-08-09"),
  },
  {
    id: "j5gr84i9",
    title: "Learn Docker",
    createdAt: new Date("2024-06-09"),
    doneAt: new Date("2024-08-10"),
  },
  {
    id: "s5gr84i9",
    title: "Learn Vue",
    createdAt: new Date("2024-06-09"),
  },
];

type TodoDataTableProps = {
  data: Todo[];
};

export function TodoDataTable({ data }: TodoDataTableProps) {
  const router = useRouter();

  const handleUpdateTodo = async (todoId: string) => {
    try {
      await updateTodo(todoId);
      router.refresh();

      toast({
        title: "Success",
        description: "Todo updated successfully!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error ocurred. Please try again.",
      });
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      router.refresh();

      toast({
        title: "Success",
        description: "Todo deleted successfully!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error ocurred. Please try again.",
      });
    }
  };

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { doneAt } = row.original;
        const status: "Done" | "Waiting" = doneAt ? "Done" : "Waiting";
        return (
          <Badge variant={status === "Done" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Created at</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.original.createdAt.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "doneAt",
      header: () => <div className="text-right">Done at</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.original.doneAt ? (
              <span>{row.original.doneAt.toLocaleDateString()}</span>
            ) : (
              <span>Not finished</span>
            )}
          </div>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const todo = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(todo.id)}
              >
                Copy todo ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateTodo(todo.id)}>
                {todo.doneAt ? (
                  <span>Mark as not finished</span>
                ) : (
                  <span>Mark as done</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
