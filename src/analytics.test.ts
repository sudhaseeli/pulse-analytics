import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAnalytics, exportCsv } from './analytics.ts';
test('all-channel totals equal the displayed rows', () => {
 const result = getAnalytics(30, 'All channels');
 assert.equal(result.revenue, 91440);
 assert.equal(result.visitors, result.rows.reduce((sum, row) => sum + row.visitors, 0));
 assert.equal(result.conversions, 2000);
});
test('channel and date filters change the dataset together', () => {
 const result = getAnalytics(90, 'Social');
 assert.equal(result.rows.length, 1);
 assert.equal(result.revenue, 44640);
 assert.equal(result.visitors, 25920);
 assert.equal(result.trend.length, 12);
 assert.ok(Math.abs(result.trend.reduce((sum, point) => sum + point.current, 0) - result.revenue) <= 6);
});
test('CSV exports only the filtered data', () => {
 assert.equal(exportCsv(getAnalytics(30, 'Direct').rows), 'Channel,Visitors,Conversions,Revenue\nDirect,12380,618,28240');
});
test('unsupported date ranges fail explicitly', () => assert.throws(() => getAnalytics(0, 'All channels')));
