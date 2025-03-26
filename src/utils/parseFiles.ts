import Papa from "papaparse"
import * as XLSX from "xlsx"

export const parseCSV = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }

  export const parseXLSX = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { 
            type: "binary",
            cellDates: true,
            cellNF: false,
            cellText: false
          });
          
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:Z1');
          const headers: string[] = [];
          
          for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
            const cell = worksheet[cellAddress];
            headers.push(cell ? String(cell.v).trim() : `Column_${C+1}`);
          }
          
          const json = XLSX.utils.sheet_to_json(worksheet, {
            header: headers,
            defval: null,
            blankrows: false
          });
          
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };