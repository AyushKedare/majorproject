// import * as React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import { cn } from "../../lib/utils";
// import { buttonVariants } from "./button";

// function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3 bg-blue-100", className)}  {/* Add the bg-blue-100 class for light blue background */}
      
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption:
//           "flex justify-center pt-1 relative items-center font-bold text-[var(--text2)]",
//         caption_label: "text-sm font-bold",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-7 font-medium text-[0.8rem] -mb-1 -mt-2",
//         row: "flex w-full mt-1",
//         cell: "h-[1.22rem] w-7 text-center text-xs relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-6 w-6 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_selected:
//           "bg-[#5932EA] text-white font-bold hover:bg-[#BAE6FD] cursor-pointer hover:text-gray-600 hover:font-bold focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-[#5932EA] text-accent-foreground",
//         day_outside: "text-muted-foreground opacity-50",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => (
//           <ChevronLeft className="h-4 w-4 text-gray-600" />
//         ),
//         IconRight: ({ ...props }) => (
//           <ChevronRight className="h-4 w-4 text-gray-600" />
//         ),
//       }}
//       {...props}
//     />
//   );
// }
// Calendar.displayName = "Calendar";

// export { Calendar };

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <div className="flex justify-end w-full mt-2 mr-5">
    <div className="flex flex-col bg-white w-[15rem] h-[15rem] rounded-2xl bigShadow">
    <div className="bg-blue-100 rounded-2xl">
      <div className={cn("p-3", className)}>
    <DayPicker
      showOutsideDays={showOutsideDays}
    //   className={cn("p-3", "bg-blue-100", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption:
          "flex justify-center pt-1 relative items-center font-bold text-[var(--text2)]",
        caption_label: "text-sm font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-7 font-medium text-[0.8rem] -mb-1 -mt-2",
        row: "flex w-full mt-1",
        cell: "h-[1.22rem] w-7 text-center text-xs relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-6 w-6 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-[#5932EA] text-white font-bold hover:bg-[#BAE6FD] cursor-pointer hover:text-gray-600 hover:font-bold focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-[#5932EA] text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
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
   
    </div>
  </div>
    
  );
}

export { Calendar };
