import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <div className="w-fit flex justify-end items-end mt-2 mr-5">  
      <div className="bg-white rounded-xl bigShadow text-black">  
      <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-blue-100 rounded-xl", className)}  
      
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption:
          "flex justify-center pt-1 relative items-center font-bold text-[var(--text2)] text-black",
        caption_label: "text-sm font-bold text-black",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-7 font-medium text-[0.8rem] -mb-1 -mt-2",
        row: "flex mt-1",
        cell: "h-[1.22rem] w-7 text-center text-xs relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-6 w-6 p-0 font-normal aria-selected:opacity-100 text-black"
        ),
        day_selected:
          "bg-[#1b093d] text-white font-bold hover:bg-[#BAE6FD] cursor-pointer hover:text-gray-600 hover:font-bold focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-[#1b093d] text-white",
        day_outside: "text-muted-foreground opacity-50 text-black",
        day_disabled: "text-muted-foreground opacity-50 text-black",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground text-black",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ),
      }}
      {...props}
    />
   </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };