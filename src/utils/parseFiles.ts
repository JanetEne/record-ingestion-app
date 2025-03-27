import Papa from "papaparse"
import * as XLSX from "xlsx"

type RowData = { [key: string]: string | number | null | undefined };

export const parseCSV = (file: File): Promise<RowData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(file, {
      complete: (preResults) => {
        const lines = preResults.data as string[][];

        let headerRowIndex = 0;
        for (let i = 0; i < lines.length; i++) {
          const row = lines[i];
          const nonEmptyCells = row.filter(
            (cell) => cell && cell.trim() !== ""
          ).length;
          if (nonEmptyCells >= 2) {
            headerRowIndex = i;
            break;
          }
        }

        Papa.parse<RowData>(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header, index) => {
            const trimmedHeader = header.trim();
            return trimmedHeader === "" ? `Column_${index + 1}` : trimmedHeader;
          },
          beforeFirstChunk: (chunk) => {
            const lines = chunk.split(/\r\n|\n|\r/);
            return lines.slice(headerRowIndex).join("\n");
          },
          complete: (results) => {
            const filteredData = results.data.filter((row: RowData) =>
              Object.values(row).some(
                (value) => value !== null && value !== ""
              )
            );
            resolve(filteredData);
          },
          error: (error) => {
            reject(error);
          },
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const parseXLSX = async (file: File): Promise<RowData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const workbook = XLSX.read(data, {
          type: "binary",
          cellDates: true,
          cellNF: false,
          cellText: false,
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const fullRange = XLSX.utils.decode_range(worksheet["!ref"] || "A1:Z100");

        let headerRowIndex = 0;
        for (let R = fullRange.s.r; R <= fullRange.e.r; R++) {
          const rowRange = { s: { r: R, c: fullRange.s.c }, e: { r: R, c: fullRange.e.c } };
          let nonEmptyCount = 0;
          for (let C = rowRange.s.c; C <= rowRange.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            const cell = worksheet[cellAddress];
            if (cell && cell.v && String(cell.v).trim() !== "") {
              nonEmptyCount++;
            }
          }
          if (nonEmptyCount >= 2) {
            headerRowIndex = R;
            break;
          }
        }

        const headerRange = {
          s: { r: headerRowIndex, c: fullRange.s.c },
          e: { r: headerRowIndex, c: fullRange.e.c },
        };
        const headers: string[] = [];
        for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: headerRowIndex, c: C });
          const cell = worksheet[cellAddress];
          const headerValue = cell && cell.v ? String(cell.v).trim() : "";
          headers.push(headerValue === "" ? `Column_${C + 1}` : headerValue);
        }

        const dataRange = {
          s: { r: headerRowIndex + 1, c: fullRange.s.c },
          e: { r: fullRange.e.r, c: fullRange.e.c },
        };
        worksheet["!ref"] = XLSX.utils.encode_range(dataRange);

        const json = XLSX.utils.sheet_to_json<RowData>(worksheet, {
          header: headers,
          defval: null,
          blankrows: false,
        });

        const filteredData = json.filter((row: RowData) =>
          Object.values(row).some(
            (value) => value !== null && value !== ""
          )
        );

        resolve(filteredData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};