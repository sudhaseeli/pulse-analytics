# Native Salesforce sales dashboard

The app includes a sample pipeline preview and a validated link to an existing Salesforce dashboard. This folder provides a build guide and sample data; it does not provision or authenticate a Salesforce org.

## Prepare data in a sandbox

Use an existing org with Opportunities, Reports, and Dashboards access, preferably a sandbox or Trailhead Playground. `opportunities.csv` is illustrative: Owner values are display names, not deployable Salesforce IDs, and stage names vary between orgs. Do not import it unchanged. First map Owner to valid OwnerId values, supply valid AccountId values where required, and map StageName to your org's configured stages. Use the Data Import tools supported by your org or Data Loader for Opportunities. No production import is required for this project.

## Build reports

Create a report folder **Pulse Analytics** and share it with the intended viewers. Use Opportunities reports and **All Time** close-date filters to reproduce this historical sample. Set Show Me to All Opportunities only when your permissions and reporting requirements allow it.

1. **Open Pipeline by Stage**: filter Closed = False, group rows by Stage, summarize Amount by Sum. Add a bar chart.
2. **Weighted Pipeline**: filter Closed = False; sum the standard Expected Revenue field (Amount × Probability). If unavailable, create a report row formula using the fields selected by the report formula editor and summarize by Sum.
3. **Closed Won Revenue**: filter Won = True and summarize Amount by Sum.
4. **Closed Outcomes**: filter Closed = True; group by Won and summarize record count. Use won-count / closed-count for the win rate; do not use the percentage of Amount. The sample has two won and one lost, giving 66.67%.
5. **Opportunity Detail**: include Opportunity Name, Owner, Stage, Amount, Probability, and Close Date.

## Assemble the dashboard

Create a dashboard named **Pulse Sales Pipeline** in an appropriately shared dashboard folder. Add the stage bar chart, weighted pipeline metric, closed won metric, closed outcomes donut, and opportunity detail table. Add an Opportunity Owner filter supported by the source reports. Choose the running user or dynamic dashboard behavior according to your org's permissions; verify viewers see only their authorized data.

Expected sample totals: open pipeline $108,000; weighted open pipeline $66,000; closed won $90,000; win rate 66.67%.

Open the native dashboard, copy its `https://YOUR-ORG.my.salesforce.com/lightning/r/Dashboard/DASHBOARD_ID/view` URL, and enter it on the website's Salesforce page. If your browser uses a `.lightning.force.com` host, use your org's equivalent My Domain `.my.salesforce.com` URL. The site opens Salesforce in a new tab rather than relying on unsupported iframe embedding. Authentication and authorization stay in Salesforce. It does not call Salesforce APIs or store access tokens.
