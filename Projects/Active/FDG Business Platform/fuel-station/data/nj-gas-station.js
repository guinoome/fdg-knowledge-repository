export const products = [
  { id: "regular", name: "Regular", color: "#1f9d5a", tankCapacity: 9000, openingStock: 6240, buyingPrice: 60.5, sellingPrice: 64.25 },
  { id: "premium", name: "Premium", color: "#d5a619", tankCapacity: 9000, openingStock: 4890, buyingPrice: 61, sellingPrice: 64.75 },
  { id: "diesel", name: "Diesel", color: "#2463eb", tankCapacity: 12000, openingStock: 8420, buyingPrice: 54.75, sellingPrice: 62.75 },
];

export const verifiedHistory = [
  { date: "2023-07-31", regularLiters: 181.65, premiumLiters: 453.76, dieselLiters: 63.04, sales: 45007.73, profit: 2216.85, status: "verified" },
  { date: "2024-05-31", regularLiters: 102.31, premiumLiters: 235.44, dieselLiters: 46.42, sales: 25838.80, profit: 1651.61, status: "verified" },
  { date: "2024-08-31", regularLiters: 81.93, premiumLiters: 168.56, dieselLiters: 26.20, sales: 17633.58, profit: 1324.74, status: "verified" },
  { date: "2025-04-29", regularLiters: 112.90, premiumLiters: 221.44, dieselLiters: 78.53, sales: 25003.75, profit: 1094.30, status: "verified" },
];

// Latest accepted close from the supplied workbook: April 2025, row 35.
// April 30 is excluded because the Premium reading reverses and is already
// retained below as a high-severity source exception.
export const latestAcceptedTotalizers = {
  date: "2025-04-29",
  source: "Workbook verified · April 2025 row 35",
  values: { regular: 68202.44, premium: 132379.26, diesel: 32833.33 },
};

export const sourceExceptions = [
  { severity: "high", date: "2025-04-30", title: "Premium totalizer reversal", detail: "Closing totalizer is below the prior reading, producing a negative 30 L result. Review the source entry before approval." },
  { severity: "high", date: "2025-07", title: "Broken workbook references", detail: "Daily sales cells contain #REF! and product columns appear misaligned. July 2025 is excluded from trusted reporting." },
  { severity: "medium", date: "Multiple periods", title: "Utility rate changes", detail: "Electrical-cost formulas use different rates across periods. Store the rate as an effective-dated input, not a hidden constant." },
];

export const initialDeliveries = [
  { id: "DEL-001", date: "2025-04-28", product: "Diesel", liters: 3000, unitCost: 54.75, reference: "Workbook refill record", status: "posted" },
  { id: "DEL-002", date: "2025-04-26", product: "Premium", liters: 2000, unitCost: 61, reference: "Workbook refill record", status: "posted" },
];

export const safetyChecklist = [
  "Dispenser condition inspected",
  "Tank readings verified",
  "Spill kit and sand available",
  "Fire extinguishers accessible",
  "Forecourt clear and signage visible",
  "Cash and totalizer evidence attached",
];

export const integrationMap = [
  { system: "FPIS", responsibility: "Experience and interface rules", contribution: "Accepted visual direction, responsive station views, usability gates" },
  { system: "FBPOIS", responsibility: "Fuel operating model", contribution: "Forecourt, pumps, tanks, wet stock, deliveries, closeout and station roles" },
  { system: "FBIS", responsibility: "Business data semantics", contribution: "Canonical product, movement, transaction, margin and reporting definitions" },
  { system: "FSIS", responsibility: "Security and audit controls", contribution: "Least privilege, evidence, traceable mutations and approval boundaries" },
  { system: "FWAIS", responsibility: "Workflow orchestration", contribution: "Human approvals, exceptions, recovery and measurable workflow outcomes" },
];
