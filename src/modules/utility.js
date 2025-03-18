
import { format, parseISO, parse } from "date-fns";

export function formatDate(date) {
   if (!date) return; // Prevent errors if no date is provided

   let dateInput = parseISO(date); // Convert "YYYY-MM-DD" to a Date object
   let formattedDate = format(dateInput, "EEE, MMM d, yyyy");
   return formattedDate;
}

export function reverseFormatDate(date) {
   if (!date) return;
   
   let parsedDate = parse(date, "EEE, MMM d, yyyy", new Date()); // Convert formatted string to Date object
   let originalFormat = format(parsedDate, "yyyy-MM-dd"); // Convert Date object back to original format
   return originalFormat;
}