# Native Power BI revenue dashboard

These are an importable sample dataset and DAX measure definitions, not a compiled `.pbix` report. Power BI Desktop and your Power BI account are required to create and publish the native dashboard.

1. In Power BI Desktop, choose **Get data → Text/CSV**, import `revenue.csv`, and name the table `Revenue`.
2. Set `Date` to Date, `Revenue` and `Target` to Whole number. Create the four measures in `measures.dax` separately; format monetary measures as USD and Target Attainment as Percentage.
3. Add cards for Total Revenue ($374,000), Revenue Target ($375,000), Target Attainment (99.73%), and Revenue Variance (-$1,000).
4. Add a clustered column chart: X axis = Date (month, ascending), Y axis = Total Revenue and Revenue Target. Add a Date slicer.
5. Publish the report to your workspace. In the Power BI service, pin the cards/chart to a new **Pulse Revenue** dashboard if desired.
6. For the website's live view, open the report's **File → Embed report → Website or portal** option and copy the iframe's HTTPS `app.powerbi.com/reportEmbed?reportId=...` URL into the Power BI page. Use the report embed URL, not a dashboard URL or the full iframe HTML.

Secure embedding requires authorized viewers, applicable licensing/capacity, tenant permissions, and browser support for the sign-in flow. The website does not issue embed tokens or implement app-owns-data authentication. Do not use Publish to web for private business data. No tokens or secrets should be entered in this project.
