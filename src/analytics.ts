export type Channel = 'All channels' | 'Organic search' | 'Direct' | 'Social' | 'Referral';
export const channels = ['All channels', 'Organic search', 'Direct', 'Social', 'Referral'] as const;
export const campaigns = [
  { name: 'Organic search', source: 'Google, Bing', visitors: 18420, conversions: 842, revenue: 38460, color: '#6d5ce8' },
  { name: 'Direct', source: 'Website visits', visitors: 12380, conversions: 618, revenue: 28240, color: '#3aa9a1' },
  { name: 'Social', source: 'Instagram, LinkedIn', visitors: 8640, conversions: 324, revenue: 14880, color: '#edac54' },
  { name: 'Referral', source: 'Partner websites', visitors: 4820, conversions: 216, revenue: 9860, color: '#86a4ed' },
];
export function getAnalytics(days: number, channel: Channel) {
  if (![7, 30, 90].includes(days)) throw new Error('Unsupported date range');
  const rows = campaigns.filter(row => channel === 'All channels' || row.name === channel);
  const scale = days / 30;
  const visitors = Math.round(rows.reduce((sum, row) => sum + row.visitors, 0) * scale);
  const conversions = Math.round(rows.reduce((sum, row) => sum + row.conversions, 0) * scale);
  const revenue = Math.round(rows.reduce((sum, row) => sum + row.revenue, 0) * scale);
  const weights = [0.72, 0.84, 0.77, 0.96, 0.88, 1.02, 0.94, 1.12, 0.98, 1.16, 1.08, 1.24];
  const total = weights.reduce((sum, value) => sum + value, 0);
  const trend = weights.map((weight, index) => ({ day: `Day ${Math.max(1, Math.round((index + 1) * days / 12))}`, current: Math.round(revenue * weight / total), previous: Math.round(revenue * (0.65 + (index % 4) * 0.1) / total) }));
  return { visitors, conversions, revenue, rate: visitors ? conversions / visitors * 100 : 0, trend, rows: rows.map(row => ({ ...row, visitors: Math.round(row.visitors * scale), conversions: Math.round(row.conversions * scale), revenue: Math.round(row.revenue * scale) })) };
}
export function exportCsv(rows: ReturnType<typeof getAnalytics>['rows']) {
  return ['Channel,Visitors,Conversions,Revenue', ...rows.map(row => `${row.name},${row.visitors},${row.conversions},${row.revenue}`)].join('\n');
}
