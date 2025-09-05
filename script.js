// State nexus thresholds and SaaS taxability data
// Based on common economic nexus thresholds and Anrok data
const stateData = {
    'Alabama': { threshold: 250000, saasTexable: true },
    'Alaska': { threshold: 100000, saasTexable: false },
    'Arizona': { threshold: 200000, saasTexable: true },
    'Arkansas': { threshold: 100000, saasTexable: true },
    'California': { threshold: 500000, saasTexable: true },
    'Colorado': { threshold: 100000, saasTexable: true },
    'Connecticut': { threshold: 100000, saasTexable: true },
    'Delaware': { threshold: 100000, saasTexable: false },
    'Florida': { threshold: 100000, saasTexable: true },
    'Georgia': { threshold: 100000, saasTexable: true },
    'Hawaii': { threshold: 100000, saasTexable: true },
    'Idaho': { threshold: 100000, saasTexable: true },
    'Illinois': { threshold: 100000, saasTexable: true },
    'Indiana': { threshold: 100000, saasTexable: true },
    'Iowa': { threshold: 100000, saasTexable: true },
    'Kansas': { threshold: 100000, saasTexable: true },
    'Kentucky': { threshold: 100000, saasTexable: true },
    'Louisiana': { threshold: 100000, saasTexable: true },
    'Maine': { threshold: 100000, saasTexable: true },
    'Maryland': { threshold: 100000, saasTexable: true },
    'Massachusetts': { threshold: 100000, saasTexable: true },
    'Michigan': { threshold: 100000, saasTexable: true },
    'Minnesota': { threshold: 100000, saasTexable: true },
    'Mississippi': { threshold: 250000, saasTexable: true },
    'Missouri': { threshold: 100000, saasTexable: false },
    'Montana': { threshold: 100000, saasTexable: false },
    'Nebraska': { threshold: 100000, saasTexable: true },
    'Nevada': { threshold: 100000, saasTexable: true },
    'New Hampshire': { threshold: 100000, saasTexable: false },
    'New Jersey': { threshold: 100000, saasTexable: true },
    'New Mexico': { threshold: 100000, saasTexable: true },
    'New York': { threshold: 500000, saasTexable: true },
    'North Carolina': { threshold: 100000, saasTexable: true },
    'North Dakota': { threshold: 100000, saasTexable: true },
    'Ohio': { threshold: 100000, saasTexable: true },
    'Oklahoma': { threshold: 100000, saasTexable: true },
    'Oregon': { threshold: 100000, saasTexable: false },
    'Pennsylvania': { threshold: 100000, saasTexable: true },
    'Rhode Island': { threshold: 100000, saasTexable: true },
    'South Carolina': { threshold: 100000, saasTexable: true },
    'South Dakota': { threshold: 100000, saasTexable: true },
    'Tennessee': { threshold: 100000, saasTexable: true },
    'Texas': { threshold: 500000, saasTexable: true },
    'Utah': { threshold: 100000, saasTexable: true },
    'Vermont': { threshold: 100000, saasTexable: true },
    'Virginia': { threshold: 100000, saasTexable: true },
    'Washington': { threshold: 100000, saasTexable: true },
    'West Virginia': { threshold: 100000, saasTexable: true },
    'Wisconsin': { threshold: 100000, saasTexable: true },
    'Wyoming': { threshold: 100000, saasTexable: false }
};

let salesData = [];

// File upload handling
document.getElementById('csvFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('fileName').textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const csv = e.target.result;
            parseCSV(csv);
        };
        reader.readAsText(file);
    }
});

// Parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    salesData = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const [state, salesAmount] = line.split(',').map(item => item.trim());
            if (state && salesAmount && !isNaN(parseFloat(salesAmount))) {
                salesData.push({
                    state: state,
                    sales: parseFloat(salesAmount)
                });
            }
        }
    }
    
    if (salesData.length > 0) {
        analyzeNexus();
        displayResults();
    } else {
        alert('No valid data found in CSV. Please check the format.');
    }
}

// Analyze nexus for each state
function analyzeNexus() {
    salesData.forEach(item => {
        const stateInfo = stateData[item.state];
        if (stateInfo) {
            item.threshold = stateInfo.threshold;
            item.hasNexus = item.sales >= stateInfo.threshold;
            item.saasTexable = stateInfo.saasTexable;
        } else {
            // Default values for unknown states
            item.threshold = 100000;
            item.hasNexus = item.sales >= 100000;
            item.saasTexable = true;
        }
    });
}

// Display results in the table
function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    const resultsBody = document.getElementById('resultsBody');
    
    // Clear previous results
    resultsBody.innerHTML = '';
    
    // Sort by sales amount (descending)
    salesData.sort((a, b) => b.sales - a.sales);
    
    // Populate table
    salesData.forEach(item => {
        const row = document.createElement('tr');
        
        const nexusClass = item.hasNexus ? 'nexus-yes' : 'nexus-no';
        const nexusText = item.hasNexus ? 'YES' : 'NO';
        
        const taxableClass = item.saasTexable ? 'taxable-yes' : 'taxable-no';
        const taxableText = item.saasTexable ? 'YES' : 'NO';
        
        row.innerHTML = `
            <td><strong>${item.state}</strong></td>
            <td>$${item.sales.toLocaleString()}</td>
            <td>$${item.threshold.toLocaleString()}</td>
            <td><span class="${nexusClass}">${nexusText}</span></td>
            <td><span class="${taxableClass}">${taxableText}</span></td>
        `;
        
        resultsBody.appendChild(row);
    });
    
    // Update summary statistics
    updateSummary();
    
    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Update summary statistics
function updateSummary() {
    const totalStates = salesData.length;
    const nexusStates = salesData.filter(item => item.hasNexus).length;
    const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
    
    document.getElementById('totalStates').textContent = totalStates;
    document.getElementById('nexusStates').textContent = nexusStates;
    document.getElementById('totalSales').textContent = `$${totalSales.toLocaleString()}`;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}