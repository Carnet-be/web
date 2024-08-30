import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarDaysIcon } from '@heroicons/react/24/outline';


const Overview: React.FC = () => {
  const [timeframe, setTimeframe] = useState("this_week");
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center justify-between w-full pt-4">
          <div className="grid grid-cols-1 gap-4">
            <Button variant="secondary" className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="text-left font-normal">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Overview;

