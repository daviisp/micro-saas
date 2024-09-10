import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { createCheckoutSessionAction, getPlanByUser } from "../actions";
import { auth } from "@/services/auth";

export async function BillingForm() {
  const session = await auth();

  if (!session) {
    return;
  }

  const plan = await getPlanByUser(session?.user?.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade Plan</CardTitle>
        <CardDescription>
          You are concurrently plan{" "}
          <span className="font-bold uppercase">{plan?.name}.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createCheckoutSessionAction}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>
                {plan?.quota.TASKS.tasksUsage}/
                {plan?.quota.TASKS.availableTasks}
              </p>
              <p>{plan?.quota.TASKS.percent}%</p>
            </div>
            <Progress value={plan?.quota.TASKS.percent} />
          </div>
          <div className="flex justify-end mt-10">
            <Button type="submit" disabled={plan?.name === "PRO"}>
              Upgrade for $9/ mounth
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
