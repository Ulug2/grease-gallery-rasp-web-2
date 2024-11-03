
import { sql } from '@vercel/postgres';

// Functions for turning the string created by OCR into useful data
// Called elsewhere to add values to the database
// Functions for RGB, CMYK, etc. assume the FIRST instance of the name (they search by the heading RGB:, CMYK:, etc.) is the standard, the second is the test (see CMYK functions)

function parseE2000(inputString: string): number | undefined {
    const regex = /E2000: (\d+)/;
    const match = inputString.match(regex);
  
    if (match) {
      const numberString = match[1];
      const number = parseInt(numberString, 10);
      return number;
    } else {
      return undefined;
    }
  }

  function parseE76Number(inputString: string): number | undefined {
    const regex = /E76: : (\d+)/;
    const match = inputString.match(regex);
  
    if (match) {
      const numberString = match[1];
      return parseInt(numberString, 10);
    } else {
      return undefined;
    }
  }

  //the first instance of 'CMYK: '
  function parseStandardCMYK(inputString: string): number[] | undefined {
    const regex = /CMYK: (\d+)% (\d+)% (\d+)% (\d+)%/i;
    const match = inputString.match(regex);
  
    if (match) {
      const [_, c, m, y, k] = match;
      return [parseInt(c), parseInt(m), parseInt(y), parseInt(k)];
    } else {
      return undefined;
    }
  }
  
  //assumes the second instance of the 'CMYK: ' string are the test values
  function parseTestCMYK(inputString: string): number[] | undefined {
    const regex = /CMYK: .*CMYK: (\d+)% (\d+)% (\d+)% (\d+)%/i;
    const match = inputString.match(regex);
  
    if (match) {
      const [_, c, m, y, k] = match.slice(1).map(Number);
      return [c, m, y, k];
    } else {
      return undefined;
    }
  }

  //assumes the first hex number is the standard value
  function parseStandardHex(inputString: string): string | undefined {
    const regex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;
    const match = inputString.match(regex);
  
    if (match) {
      return match[1];
    } else {
      return undefined;
    }
  }

  //assumes the second hex number is the test value
  function parseTestHex(inputString: string): string | undefined {
    const regex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
    const matches = inputString.match(regex);
  
    return matches?.[1];
  }

  //same assumptions
  function parseStandardCIELAB(inputString: string): number[] | undefined {
    const regex = /CIELAB:(-?\d+\.\d+)(-?\d+\.\d+)(-?\d+\.\d+)/;
    const match = inputString.match(regex);
  
    if (match) {
      const [_, L, a, b] = match.slice(1).map(Number);
      return [L, a, b];
    } else {
      return undefined;
    }
  }

  //same assumptions
  function parseTestCIELAB(inputString: string): number[] | undefined {
    const regex = /CIELAB: .*CIELAB: (-?\d+\.\d+) *(-?\d+\.\d+) *(-?\d+\.\d+)/i;
    const match = inputString.match(regex);
  
    if (match) {
      const [_, L, a, b] = match.slice(1).map(Number);
      return [L, a, b];
    } else {
      return undefined;
    }
  }

  //same assumptions
  function parseStandardLCHab(inputString: string): number[] | undefined {
    const regex = /LCH\(ab\):(-?\d+\.\d+) *(-?\d+\.\d+) *(-?\d+\.\d+)/i;
    const match = inputString.match(regex);
  
    if (match) {
      const [_, L, C, h] = match.slice(1).map(Number);
      return [L, C, h];
    } else {
      return undefined;
    }
  }
  
  //same assumptions
  function parseTestLCH(inputString: string): number[] | undefined {
    const regex = /LCH: .*LCH: (-?\d+\.\d+) *(-?\d+\.\d+) *(-?\d+\.\d+)/i;
    const match = inputString.match(regex);
  
    if (match) {
      const [_, L, C, h] = match.slice(1).map(Number);
      return [L, C, h];
    } else {
      return undefined;
    }
  }

  //return all E2000 values as an array of numbers
  export async function fetchDeltaE2000Values(): Promise<number[]> {

    const { rows } = await sql`SELECT delta_e2000 FROM searches`;

    //Extract delta_e2000 values from rows and return as an array of numbers
    return rows.map(row => row.delta_e2000);

  }

  //Finds the largest E2000 value
  //Returns the value, as well as the ID in the format {E2000, ID}
  export async function findLargestDeltaE2000(): Promise<{ delta_e2000: number, id: number }> {
    const { rows } = await sql`
      SELECT delta_e2000, id
      FROM searches
      ORDER BY delta_e2000 DESC
      LIMIT 1;
    `;
    // Explicitly type the rows array
    const [row] = rows as [{ delta_e2000: number, id: number }];

    return row;
  }