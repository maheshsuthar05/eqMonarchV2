const WidgetsData = {
  widgets: {
    riskFactor: {
      data: [
        {
          key: 'occupied',
          title: 'Occupied',
          level: 'occupied'
        },
        {
          key: 'stateEvictionCosts',
          title: 'State Eviction Costs',
          level: 'low'
        },
        {
          key: 'riskOfReconveyance',
          title: 'Risk Of Reconveyance',
          level: 'low'
        },
        {
          key: 'highMarket',
          title: 'High Market',
          level: 'low'
        },
        {
          key: 'addressSearch',
          title: 'Address Search',
          level: 'medium'
        },
        { key: 'avm', title: 'AVM', level: 'low' }
      ]
    },
    timeProjection: {
      data: [
        {
          title: 'CWCOT',
          months: 2.8,
          start: '9/2/2021',
          end: '11/25/2021'
        },
        {
          title: 'Conveyance',
          months: 4.06,
          start: '9/2/2021',
          end: '1/1/2022'
        },
        {
          title: 'REO As Is',
          months: 7.43,
          start: '9/2/2021',
          end: '4/13/2022'
        },
        {
          title: 'REO Repair',
          months: 10.03,
          start: '9/2/2021',
          end: '6/30/2022'
        }
      ]
    },
    strategyTask: {
      data: [
        {
          title: 'CWCOT',
          priority: '1st Recommend',
          price: '$17,387',
          color: 'green'
        },
        {
          title: 'Conveyance',
          priority: 'Not optimal',
          price: '$21,176',
          color: 'red'
        },
        {
          title: 'REO As Is',
          priority: 'Not optimal',
          price: '$48,031',
          color: 'red'
        },
        {
          title: 'REO Repair',
          priority: '2nd Recommend',
          price: '$19,205',
          color: 'orange'
        }
      ]
    },
    listingPrice: {
      title: 'Listing Price',
      color: '#0288d1',
      impressions: {
        value: '$250,000',
        ofTarget: 12
      },
      chartType: 'line',
      datasets: [
        {
          label: 'Impression',
          data: [
            67000,
            54000,
            82000,
            57000,
            72000,
            57000,
            87000,
            72000,
            89000,
            98700,
            112000,
            136000,
            110000,
            149000,
            98000
          ],
          fill: false
        }
      ],
      labels: [
        'Jan 1',
        'Jan 2',
        'Jan 3',
        'Jan 4',
        'Jan 5',
        'Jan 6',
        'Jan 7',
        'Jan 8',
        'Jan 9',
        'Jan 10',
        'Jan 11',
        'Jan 12',
        'Jan 13',
        'Jan 14',
        'Jan 15'
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 2,
            borderWidth: 1,
            hoverRadius: 2,
            hoverBorderWidth: 1
          },
          line: {
            tension: 0
          }
        },
        layout: {
          padding: {
            top: 24,
            left: 16,
            right: 16,
            bottom: 16
          }
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                // min: 100,
                // max: 500
              }
            }
          ]
        }
      }
    },
    valuation: {
      title: 'Valuation',
      color: '',
      impressions: {
        value: '$200,000',
        ofTarget: 12
      },
      chartType: 'line',
      datasets: [
        {
          label: 'Impression',
          data: [
            67000,
            54000,
            82000,
            57000,
            72000,
            57000,
            87000,
            72000,
            89000,
            98700,
            112000,
            136000,
            110000,
            149000,
            98000
          ],
          fill: false
        }
      ],
      labels: [
        'Jan 1',
        'Jan 2',
        'Jan 3',
        'Jan 4',
        'Jan 5',
        'Jan 6',
        'Jan 7',
        'Jan 8',
        'Jan 9',
        'Jan 10',
        'Jan 11',
        'Jan 12',
        'Jan 13',
        'Jan 14',
        'Jan 15'
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 2,
            borderWidth: 1,
            hoverRadius: 2,
            hoverBorderWidth: 1
          },
          line: {
            tension: 0
          }
        },
        layout: {
          padding: {
            top: 24,
            left: 16,
            right: 16,
            bottom: 16
          }
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                // min: 100,
                // max: 500
              }
            }
          ]
        }
      }
    },
    openTask: {
      title: 'Open',
      data: {
        label: 'TASKS',
        count: 4,
        color: 'red',
        extra: {
          label: "Yesterday's Completed",
          count: 2
        }
      },
      detail:
        'You can show some detailed information about this widget in here.',
      url: {
        enable: true,
        url: ''
      }
    },
    closeTask: {
      title: 'Completed',
      data: {
        label: 'TASKS',
        count: 32,
        color: 'orange',
        extra: {
          label: 'Closed today',
          count: 0
        }
      },
      url: {
        enable: true,
        url: ''
      },
      detail:
        'You can show some detailed information about this widget in here.'
    },
    daysInReo: {
      title: 'Days In REO',
      data: {
        label: '',
        count: 10,
        color: 'green',
        extra: {
          label: 'Pending',
          count: 1
        }
      },
      detail:
        'You can show some detailed information about this widget in here.',
      url: {
        enable: false,
        url: ''
      }
    },
    offerTask: {
      title: 'Offers',
      data: {
        label: 'NEW',
        count: 10,
        color: 'green',
        extra: {
          label: 'Pending',
          count: 1
        }
      },
      url: {
        enable: true,
        url: ''
      }
    },
    tableTask: {
      title: 'Gain Loss Details',
      table: {
        columns: [
          {
            id: 'budget_type',
            title: 'Type'
          },
          {
            id: 'total_budget',
            title: 'Total'
          },
          {
            id: 'spent_usd',
            title: 'Spent ($)'
          },
          {
            id: 'spent_perc',
            title: 'Spent (%)'
          },
          {
            id: 'remaining_usd',
            title: 'Remaining ($)'
          },
          {
            id: 'remaining_perc',
            title: 'Remaining (%)'
          }
        ],
        rows: [
          {
            id: 1,
            cells: [
              {
                id: 'budget_type',
                value: 'HOA',
                classes: 'bg-white text-black',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$4,880.00',
                classes: 'font-bold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$4,000.00',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%94.08',
                classes: 'text-green',
                icon: 'trending_up'
              },
              {
                id: 'remaining_usd',
                value: '$880.00',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%5.92',
                classes: '',
                icon: ''
              }
            ]
          },
          {
            id: 2,
            cells: [
              {
                id: 'budget_type',
                value: 'Repair',
                classes: 'bg-white text-black',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$11,079.66',
                classes: 'font-bold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$7,240.34',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%81.78',
                classes: 'text-green',
                icon: 'trending_up'
              },
              {
                id: 'remaining_usd',
                value: '$3,839.66',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%18.22',
                classes: '',
                icon: ''
              }
            ]
          },
          {
            id: 3,
            cells: [
              {
                id: 'budget_type',
                value: 'Utilities',
                classes: 'bg-white text-black',
                icon: ''
              },
              {
                id: 'total_budget',
                value: '$3,720.00',
                classes: 'font-bold',
                icon: ''
              },
              {
                id: 'spent_usd',
                value: '$518.00',
                classes: '',
                icon: ''
              },
              {
                id: 'spent_perc',
                value: '%10.13',
                classes: 'text-red',
                icon: 'trending_down'
              },
              {
                id: 'remaining_usd',
                value: '$3,202',
                classes: '',
                icon: ''
              },
              {
                id: 'remaining_perc',
                value: '%89.87',
                classes: '',
                icon: ''
              }
            ]
          }
        ]
      }
    },
    preservation: {
      title: 'Details',
      data1: [
        {
          key: 'Occupancy',
          value: 'Occupied'
        },
        {
          key: 'Last Inspection Date',
          value: 'N/A'
        },
        {
          key: 'Reoccurring Inspections',
          value: 'Yes'
        },
        {
          key: 'First Time Vacant',
          value: 'N/A'
        },
        {
          key: 'Stop Work Date',
          value: 'N/A'
        },
        {
          key: 'Initial Secure Date',
          value: 'N/A'
        },
        {
          key: 'HOA',
          value: 'No'
        },
        {
          key: 'Gas',
          value: 'Yes'
        },
        {
          key: 'Electric',
          value: 'Yes'
        },
        {
          key: 'Water',
          value: 'Yes'
        }
      ],
      data2: [
        {
          key: 'ICC',
          value: 'No'
        },
        {
          key: 'Date ICC',
          value: 'N/A'
        },
        {
          key: 'Date Loan Fell Out Of ICC',
          value: 'N/A'
        },
        {
          key: 'Latest ICC Date',
          value: 'N/A'
        },
        {
          key: 'Conveyance Due Date',
          value: 'N/A'
        },
        {
          key: 'Extention Request',
          value: 'N/A'
        },
        {
          key: 'Extention Request Date',
          value: 'N/A'
        },
        {
          key: 'Extention Approval Date',
          value: 'N/A'
        },
        {
          key: 'New Conveyance Due Date',
          value: 'N/A'
        }
      ]
    },
    occupancy: {
      title: 'Occupancy',
      data1: [
        {
          key: 'Status',
          value: 'Occupied'
        },
        {
          key: 'Status Change Date',
          value: '8/1/2020'
        },
        {
          key: 'Cash for Relocation Offered?',
          value: 'No'
        },
        {
          key: 'Vacant Date Agreed To',
          value: 'None'
        },
        {
          key: 'Occupant Agreed to CFR',
          value: 'N/A'
        }
      ],
      data2: [
        {
          key: 'Current Occupant',
          value: 'No'
        },
        {
          key: 'Eviction Complete Date',
          value: 'N/A'
        },
        {
          key: 'Eviction Start Date',
          value: 'N/A'
        },
        {
          key: 'Initial Occupancy Check Date',
          value: 'N/A'
        },
        {
          key: 'Eviction Processed ?',
          value: 'N/A'
        }
      ]
    },
    disposition: {
      title: 'Disposition',
      data1: [
        {
          key: 'Sale Price',
          value: '$155,000'
        },
        {
          key: 'Net Proceeds',
          value: '$125,000'
        },
        {
          key: 'Sale Date',
          value: '11/1/2020'
        },
        {
          key: 'Contract Executed Date',
          value: '11/1/2020'
        },
        {
          key: 'Sale Inspection',
          value: '11/1/2020'
        }
      ],
      data2: []
    },
    closing: {
      title: 'Closing',
      data1: [
        {
          key: 'Status',
          value: 'Not Closed'
        },
        {
          key: 'Est Closing Date',
          value: '6/1/2020'
        },
        {
          key: 'Amended Close Date',
          value: 'N/A'
        },
        {
          key: 'Original Close Date',
          value: 'N/A'
        },
        {
          key: 'Closing Date Reason',
          value: 'N/A'
        }
      ],
      data2: []
    },
    marketing: {
      title: 'Marketing',
      data1: [
        {
          key: 'List Status',
          value: 'Not Listed'
        },
        {
          key: 'List Date',
          value: '6/1/2020'
        },
        {
          key: 'List Price',
          value: '$155,000'
        },
        {
          key: 'Initial List Date',
          value: '6/1/2020'
        },
        {
          key: 'List Expiray Date',
          value: '11/1/2020'
        }
      ],
      data2: []
    },
    reo: {
      title: 'Date',
      data1: [
        {
          key: 'Start Date',
          value: '6/1/2020'
        },
        {
          key: 'Settlement',
          value: '6/30/2020'
        },
        {
          key: 'Confirmation',
          value: '7/4/2020'
        }
      ],
      data2: []
    },
    foreclosure: {
      title: 'Foreclosure',
      data1: [
        {
          key: 'Sale Date',
          value: '6/1/2020'
        },
        {
          key: 'Sale value',
          value: '$155,000'
        },
        {
          key: 'Attorney',
          value: 'Joe Attny'
        },
        {
          key: 'Address',
          value: '123 Main st, Chalotte, Nc 73222'
        },
        {
          key: 'Email',
          value: 'Joe@attny.com'
        },
        {
          key: 'Firm',
          value: 'Joe Patners LLP'
        }
      ],
      data2: [
        {
          key: 'FHA Appraisal',
          value: '$155,000'
        },
        {
          key: 'FHA Appraisal Data',
          value: '7/1/2020'
        },
        {
          key: 'Attorney',
          value: 'Joe Attny'
        },
        {
          key: 'Address',
          value: '123 Main st, Chalotte, Nc 73222'
        },
        {
          key: 'Email',
          value: 'Joe@attny.com'
        }
      ]
    },
    inspection: {
      title: 'Inspection',
      data1: [
        {
          key: 'Start Date',
          value: '6/1/2020'
        },
        {
          key: 'Settlement',
          value: '6/30/2020'
        },
        {
          key: 'Confirmation',
          value: '7/4/2020'
        }
      ],
      data2: []
    },
    appraisal: {
      title: 'Appraisal',
      data1: [
        {
          key: 'Start Date',
          value: '6/1/2020'
        },
        {
          key: 'Settlement',
          value: '6/30/2020'
        },
        {
          key: 'Confirmation',
          value: '7/4/2020'
        }
      ],
      data2: []
    },
    Title: {
      title: 'Title',
      data1: [
        {
          key: 'Start Date',
          value: '6/1/2020'
        },
        {
          key: 'Settlement',
          value: '6/30/2020'
        },
        {
          key: 'Confirmation',
          value: '7/4/2020'
        }
      ],
      data2: []
    },
    Occupancy: {
      title: 'Occupancy',
      data1: [
        {
          key: 'Start Date',
          value: '6/1/2020'
        },
        {
          key: 'Settlement',
          value: '6/30/2020'
        },
        {
          key: 'Confirmation',
          value: '7/4/2020'
        }
      ],
      data2: []
    }
  }
};

export default WidgetsData;
