# Coder Sales Tax Nexus Analyzer

A web application that analyzes sales data to determine if Coder has physical nexus in various US states based on economic nexus thresholds.

## Features

- **CSV Upload**: Upload sales data by state
- **Nexus Analysis**: Automatically determines nexus based on state-specific thresholds
- **Visual Dashboard**: Clean interface showing nexus status and sales summaries
- **SaaS Tax Info**: Shows whether SaaS is taxable in each state
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. Open `index.html` in a web browser
2. Upload a CSV file with your sales data
3. View the nexus analysis results

## CSV Format

The CSV file should contain two columns:
- **State**: Full state name (e.g., "California")
- **Sales Amount**: Numeric value (e.g., 150000)

Example:
```
California, 750000
New York, 450000
Texas, 380000
```

A sample file `sample_sales_data.csv` is included for testing.

## Nexus Thresholds

The application uses common economic nexus thresholds:
- Most states: $100,000 annual sales
- California: $500,000 annual sales
- New York: $500,000 annual sales
- Texas: $500,000 annual sales
- Alabama/Mississippi: $250,000 annual sales

## SaaS Taxability

The app indicates whether SaaS products are generally taxable in each state based on current tax laws. States without sales tax (Alaska, Delaware, Montana, New Hampshire, Oregon) or states that don't typically tax SaaS are marked accordingly.

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **No Backend Required**: Runs entirely in the browser
- **Data Processing**: Client-side CSV parsing and analysis
- **Responsive**: Mobile-friendly design

## Files

- `index.html` - Main application interface
- `styles.css` - Styling and responsive design
- `script.js` - Application logic and data processing
- `sample_sales_data.csv` - Example data file
- `README.md` - This documentation

## Disclaimer

This tool is for informational purposes only. Sales tax nexus rules are complex and change frequently. Always consult with a qualified tax professional for official nexus determinations and compliance requirements.

## Data Sources

Nexus thresholds and SaaS taxability information is based on:
- State Department of Revenue websites
- Anrok SaaS Sales Tax Index
- Common economic nexus standards

*Last updated: 2024*