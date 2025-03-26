import { MAX_FILE_SIZE } from '@/utils/constants';
import * as z from 'zod';

export const uploadSchema = z
  .object({
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
    dateType: z.string({
      required_error: "Date type is required",
    }).min(1, { message: "Date type is required" }),
    file: z
      .any()
      .refine((file) => file && file.size > 0, "File is required")
      .refine((file) => file && file.size <= MAX_FILE_SIZE, "File size must be less than 5MB")
      .refine((file) => {
        if (!file) return false
        const fileType = file.name.split(".").pop().toLowerCase()
        return ["csv", "xlsx"].includes(fileType)
      }, "Only CSV or XLSX files are allowed"),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
