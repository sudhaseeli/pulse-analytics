export const sales = [
 { month: 'Jan', revenue: 42000, target: 50000 },
 { month: 'Feb', revenue: 53000, target: 55000 },
 { month: 'Mar', revenue: 61000, target: 60000 },
 { month: 'Apr', revenue: 58000, target: 65000 },
 { month: 'May', revenue: 74000, target: 70000 },
 { month: 'Jun', revenue: 86000, target: 75000 },
];
export const opportunities = [
 { name: 'Acme expansion', owner: 'Jamie Davis', stage: 'Negotiation', amount: 48000, probability: 80 },
 { name: 'Northstar annual plan', owner: 'Alex Chen', stage: 'Proposal', amount: 36000, probability: 60 },
 { name: 'Meridian rollout', owner: 'Sam Rivera', stage: 'Qualification', amount: 24000, probability: 25 },
 { name: 'Atlas enterprise', owner: 'Jamie Davis', stage: 'Closed Won', amount: 62000, probability: 100 },
 { name: 'Harbor renewal', owner: 'Alex Chen', stage: 'Closed Won', amount: 28000, probability: 100 },
 { name: 'Summit pilot', owner: 'Sam Rivera', stage: 'Closed Lost', amount: 18000, probability: 0 },
];
export function pipelineSummary(owner = 'All owners') {
 const rows = opportunities.filter(row => owner === 'All owners' || row.owner === owner);
 const open = rows.filter(row => !row.stage.startsWith('Closed'));
 const won = rows.filter(row => row.stage === 'Closed Won');
 const closed = rows.filter(row => row.stage.startsWith('Closed'));
 return { rows, pipeline: open.reduce((sum, row) => sum + row.amount, 0), weighted: open.reduce((sum, row) => sum + row.amount * row.probability / 100, 0), won: won.reduce((sum, row) => sum + row.amount, 0), winRate: closed.length ? won.length / closed.length * 100 : 0 };
}
export function powerBiEmbedUrl(raw: string): string | null {
 try {
  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.hostname !== 'app.powerbi.com' || url.username || url.password || url.port) return null;
  if (url.pathname !== '/reportEmbed' || !url.searchParams.get('reportId')) return null;
  return url.href;
 } catch { return null; }
}
export function salesforceDashboardUrl(raw: string): string | null {
 try {
  const url = new URL(raw);
  if (url.protocol !== 'https:' || !url.hostname.endsWith('.my.salesforce.com') || url.username || url.password || url.port) return null;
  return /^\/lightning\/r\/Dashboard\/[a-zA-Z0-9]{15}(?:[a-zA-Z0-9]{3})?\/view$/.test(url.pathname) ? url.href : null;
 } catch { return null; }
}
