# Atlas AI Frontend API Requirements

## Dashboard

GET /api/dashboard

Response

```json
{
  "metrics": {
    "totalRevenue": {
      "label": "Total Revenue",
      "value": 2765,
      "change": 10
    },
    "inventoryValue": {
      "label": "Inventory Value",
      "value": 896,
      "change": 10
    },
    "grossMargin": {
      "label": "Gross Margin",
      "value": 253,
      "change": -10
    }
  },
  "performance": [
    {
      "period": "Monday",
      "sales": 150,
      "inventory": 30
    }
  ],
  "alerts": [
    {
      "title": "Stockout Risk",
      "message": "Product A will run out in 3 days.",
      "severity": "high"
    }
  ]
}
```