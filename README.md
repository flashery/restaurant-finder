# 🍽️ Restaurant Finder

> **A coding‑challenge project that demonstrates how LLM‑powered natural‑language search can make choosing where to eat delightfully simple.**

![Restaurant Finder banner](docs/assets/banner.png)

---

## ✨ Key Features

| # | Capability                             | Description                                                                                                                                                      |
| - | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Natural‑Language Search**            | Users type questions like *“Sushi spots near Ortigas open after 10 PM under ₱500/person”* – the request is parsed by OpenAI and converted to structured filters.           |
| 2 | **Filterable Results**                 | Cuisine, price range, rating, distance, and open‑now toggles can be refined after the initial search.                                                            |
| 3 | **Rich Detail View**                   | Click a card to view menu highlights, contact info, Google Maps link, and user reviews.                                                                          |
| 4 | **Typed API**                          | TypeScript on both sides with a lightweight Express                                              |
| 5 | **100 % Test Coverage for Core Logic** | Jest unit tests for query parsing and service layer; Vitest for React components.                                                                                |

## 🚀 Quick Start

> **Prerequisites** – Node ≥20, pnpm ≥8, and an OpenAI API key.

```shell
# 1  Clone & install
$ git clone https://github.com/flashery/restaurant-finder.git
$ cd restaurant-finder
$ pnpm install --filter backend  && pnpm install --filter frontend    

# 2  Create environment file
$ cp backend/env.example .env && cp frontend/env.example .env
#  …then add your API Keys, etc.

# 4  Run everything in dev mode (concurrently)
$ pnpm --filter backend dev  
$ pnpm --filter frontend dev  
```

The site is now visible at **`http://localhost:5173`** and the API at **`http://localhost:4000`**.

---

## 🧪 Testing

```bash
pnpm --filter backend test            # Node + Jest (coverage)
```

---

## 📜 API Reference

### `POST /api/v1/execute`

Request Body

```json
{
    "message": "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating."
}   

```

Returns an array of matching restaurants.

```json
[
  {
        "fsq_id": "5be50e7b270ee7002c603fd0",
        "categories": [
            {
                "id": 13055,
                "name": "Fried Chicken Joint",
                "short_name": "Fried Chicken",
                "plural_name": "Fried Chicken Joints",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/food/friedchicken_",
                    "suffix": ".png"
                }
            },
            {
                "id": 13263,
                "name": "Japanese Restaurant",
                "short_name": "Japanese",
                "plural_name": "Japanese Restaurants",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/food/japanese_",
                    "suffix": ".png"
                }
            },
            {
                "id": 13334,
                "name": "Sandwich Spot",
                "short_name": "Sandwich Spot",
                "plural_name": "Sandwich Spots",
                "icon": {
                    "prefix": "https://ss3.4sqi.net/img/categories_v2/food/deli_",
                    "suffix": ".png"
                }
            }
        ],
        "chains": [],
        "closed_bucket": "LikelyOpen",
        "distance": 856,
        "geocodes": {
            "main": {
                "latitude": 34.034896,
                "longitude": -118.240628
            },
            "roof": {
                "latitude": 34.034896,
                "longitude": -118.240628
            }
        },
        "link": "/v3/places/5be50e7b270ee7002c603fd0",
        "location": {
            "address": "767 S Alameda St",
            "address_extended": "Ste 122",
            "census_block": "060372260022006",
            "country": "US",
            "cross_street": "",
            "dma": "Los Angeles",
            "formatted_address": "767 S Alameda St, Los Angeles, CA 90021",
            "locality": "Los Angeles",
            "postcode": "90021",
            "region": "CA"
        },
        "name": "Pikunico",
        "related_places": {
            "parent": {
                "fsq_id": "57a28b3138fac2fe3185da54",
                "categories": [
                    {
                        "id": 17114,
                        "name": "Shopping Mall",
                        "short_name": "Mall",
                        "plural_name": "Shopping Malls",
                        "icon": {
                            "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/mall_",
                            "suffix": ".png"
                        }
                    }
                ],
                "name": "Row Dtla"
            }
        },
        "timezone": "America/Los_Angeles",
        "rating": 8.1,
        "open_now": true
    },
]
```

| Query Param | Example                        | Notes                               |
| ----------- | ------------------------------ | ----------------------------------- |
| `q`         | *“cheap vegan in QC open now”* | Natural language; parsed by OpenAI. |


> Made with ☕ and 🍜 by **Yves Gonzaga** during the 2025 coding challenge.
