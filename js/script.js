const salesData = {
    cars: {
        labels: ['Ferrari Purosangue', 'Ferrari SF90 Stradale', 'Ferrari 296 GTB'],
        prices: [400000, 500000, 320000],
        october: [300, 180, 200],
        november: [310, 185, 210]
    },
    handbags: {
        labels: ['Birkin 25', 'Kelly 25', 'Kelly Pochette', 'Constance-To-Go', 'Mini Lindy'],
        prices: [12500, 10500, 8000, 7500, 6500],
        october: [125, 110, 98, 150, 200],
        november: [130, 112, 100, 155, 210]
    },
    jewelry: {
        labels: ['Rolex Submariner Date', 'Rolex Daytona', 'Cartier Tank Must', 'Cartier Love Bracelet', 'Tiffany Lock Collection', 'Tiffany T1 Collection'],
        prices: [15000, 14000, 3500, 6500, 3000, 4000],
        october: [250, 230, 180, 220, 140, 155],
        november: [260, 235, 185, 225, 145, 160]
    },
    fashion: {
        labels: ['Gucci Dionysus Bag', 'Gucci Ace Sneakers', 'Keepall Bandoulière', 'LV Trainer Sneakers', 'Chanel Classic Flap Bag', 'Dior Book Tote'],
        prices: [2500, 700, 2000, 1200, 8500, 3000],
        october: [210, 320, 175, 190, 300, 240],
        november: [215, 330, 180, 195, 310, 245]
    }
};

const pageAnalytics = {
    pageViews: {
        cars: {
            total: 245000,
            uniqueVisitors: 180000,
            avgTimeSpent: "4:30",
            bounceRate: "22%",
            topProduct: "Ferrari Purosangue"
        },
        handbags: {
            total: 890000,
            uniqueVisitors: 650000,
            avgTimeSpent: "6:15",
            bounceRate: "18%",
            topProduct: "Birkin 25"
        },
        jewelry: {
            total: 720000,
            uniqueVisitors: 520000,
            avgTimeSpent: "5:45",
            bounceRate: "20%",
            topProduct: "Rolex Daytona"
        },
        fashion: {
            total: 1250000,
            uniqueVisitors: 980000,
            avgTimeSpent: "5:20",
            bounceRate: "15%",
            topProduct: "Chanel Classic Flap Bag"
        }
    },
    deviceUsage: {
        desktop: "45%",
        mobile: "40%",
        tablet: "15%"
    },
    peakTrafficHours: {
        weekday: "2PM - 8PM",
        weekend: "11AM - 6PM"
    },
    conversionMetrics: {
        cars: {
            viewToInquiry: "15.5%",
            inquiryToPurchase: "62%",
            avgOrderValue: "$425,000"
        },
        handbags: {
            viewToInquiry: "10.7%",
            inquiryToPurchase: "45%",
            avgOrderValue: "$11,500"
        },
        jewelry: {
            viewToInquiry: "10%",
            inquiryToPurchase: "38%",
            avgOrderValue: "$8,200"
        },
        fashion: {
            viewToInquiry: "12%",
            inquiryToPurchase: "42%",
            avgOrderValue: "$3,800"
        }
    }
};

function createChart(categoryData, elementId) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const octoberRevenue = categoryData.october.map((units, idx) => units * categoryData.prices[idx]);
    const novemberRevenue = categoryData.november.map((units, idx) => units * categoryData.prices[idx]);

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categoryData.labels,
            datasets: [
                {
                    label: 'October Revenue',
                    data: octoberRevenue,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                },
                {
                    label: 'November Revenue',
                    data: novemberRevenue,
                    backgroundColor: 'rgba(153, 102, 255, 0.8)',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenue in USD'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function renderAnalytics() {
    document.querySelector('#categoryStats .stats-content').innerHTML = `
        <div class="stat-item">
            <p>Most Viewed: Fashion (${pageAnalytics.pageViews.fashion.total.toLocaleString()} views)</p>
            <p>Highest Conversion: Cars (${pageAnalytics.conversionMetrics.cars.inquiryToPurchase})</p>
            <p>Best Performing: ${pageAnalytics.pageViews.fashion.topProduct}</p>
        </div>
    `;

    document.querySelector('#engagementStats .stats-content').innerHTML = `
        <div class="stat-item">
            <p>Desktop: ${pageAnalytics.deviceUsage.desktop}</p>
            <p>Mobile: ${pageAnalytics.deviceUsage.mobile}</p>
            <p>Peak Hours: ${pageAnalytics.peakTrafficHours.weekday}</p>
        </div>
    `;

    document.querySelector('#conversionStats .stats-content').innerHTML = `
        <div class="stat-item">
            <p>Cars: ${pageAnalytics.conversionMetrics.cars.avgOrderValue}</p>
            <p>Handbags: ${pageAnalytics.conversionMetrics.handbags.avgOrderValue}</p>
            <p>Jewelry: ${pageAnalytics.conversionMetrics.jewelry.avgOrderValue}</p>
            <p>Fashion: ${pageAnalytics.conversionMetrics.fashion.avgOrderValue}</p>
        </div>
    `;

    const geoCtx = document.getElementById('geoChart').getContext('2d');
    new Chart(geoCtx, {
        type: 'pie',
        data: {
            labels: ['America', 'Europe', 'Asia', 'Other'],
            datasets: [{
                data: [47.92, 30.09, 16.62, 5.37],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

window.onload = function() {
    createChart(salesData.cars, 'carsChart');
    createChart(salesData.handbags, 'handbagsChart');
    createChart(salesData.jewelry, 'jewelryChart');
    createChart(salesData.fashion, 'fashionChart');
    renderAnalytics();
};
