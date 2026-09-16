export function salesPeriod(rows, range, date) {
  const start = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(+start) || start.toISOString().slice(0, 10) !== date) throw new Error("Choose a valid calendar date.");
  if (range === "hourly") return null;
  if (!["daily", "weekly", "monthly", "annually"].includes(range)) throw new Error("Unknown sales period.");
  const end = new Date(start);
  if (range === "weekly") {
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    end.setTime(+start); end.setUTCDate(end.getUTCDate() + 6);
  } else if (range === "monthly") {
    start.setUTCDate(1); end.setUTCMonth(end.getUTCMonth() + 1, 0);
  } else if (range === "annually") {
    start.setUTCMonth(0, 1); end.setUTCMonth(11, 31);
  }
  const from = start.toISOString().slice(0, 10), to = end.toISOString().slice(0, 10);
  const selected = rows.filter(row => row.date >= from && row.date <= to);
  return { from, to, days: Math.round((end - start) / 86400000) + 1,
    recordedDays: new Set(selected.map(row => row.date)).size, count: selected.length,
    local: selected.some(row => row.status === "local"),
    sales: selected.reduce((sum, row) => sum + Number(row.sales || 0), 0),
    products: Object.fromEntries(["regular", "premium", "diesel"].map(id => [id, selected.reduce((sum, row) => sum + Number(row[`${id}Liters`] || 0), 0)])) };
}
