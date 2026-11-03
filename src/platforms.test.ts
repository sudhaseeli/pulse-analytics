import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pipelineSummary, powerBiEmbedUrl, salesforceDashboardUrl, sales } from './platforms.ts';
test('pipeline excludes closed deals and weights open probabilities', () => {
 const summary = pipelineSummary();
 assert.equal(summary.pipeline, 108000);
 assert.equal(summary.weighted, 66000);
 assert.equal(summary.won, 90000);
 assert.ok(Math.abs(summary.winRate - 200 / 3) < .001);
});
test('owner filter recalculates every pipeline metric', () => {
 const summary = pipelineSummary('Alex Chen');
 assert.equal(summary.rows.length, 2);
 assert.equal(summary.pipeline, 36000);
 assert.equal(summary.weighted, 21600);
 assert.equal(summary.won, 28000);
 assert.equal(summary.winRate, 100);
 assert.equal(pipelineSummary('Nobody').winRate, 0);
});
test('revenue and target dataset totals', () => {
 assert.equal(sales.reduce((sum, row) => sum + row.revenue, 0), 374000);
 assert.equal(sales.reduce((sum, row) => sum + row.target, 0), 375000);
});
test('Power BI URL validation permits only secure native embeds', () => {
 assert.ok(powerBiEmbedUrl('https://app.powerbi.com/reportEmbed?reportId=123'));
 for (const url of ['javascript:alert(1)', 'https://app.powerbi.com.evil.com/reportEmbed?reportId=x', 'http://app.powerbi.com/reportEmbed?reportId=x', 'https://app.powerbi.com/reportEmbed', 'https://app.powerbi.com/view?r=x', 'https://user:secret@app.powerbi.com/reportEmbed?reportId=x']) assert.equal(powerBiEmbedUrl(url), null);
});
test('Salesforce link validation restricts destination and dashboard path', () => {
 assert.ok(salesforceDashboardUrl('https://acme.my.salesforce.com/lightning/r/Dashboard/01Z000000000001AAA/view'));
 for (const url of ['https://evil.com/lightning/r/Dashboard/01Z000000000001AAA/view', 'https://acme.my.salesforce.com.evil.com/lightning/r/Dashboard/01Z000000000001AAA/view', 'https://acme.my.salesforce.com/setup', 'http://acme.my.salesforce.com/lightning/r/Dashboard/01Z000000000001AAA/view']) assert.equal(salesforceDashboardUrl(url), null);
});
