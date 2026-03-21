const pool = require("../config/db");
const { ok, fail } = require("../utils/response");

function normalize(text = "") {
  return text.toLowerCase().trim();
}

async function askChatbot(req, res) {
  try {
    const message = String(req.body.message || "").trim();

    if (!message) {
      return fail(res, "Message is required", 400);
    }

    const text = normalize(message);

    // greetings
    if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey") ||
      text === "hii"
    ) {
      return ok(res, {
        reply:
          "Hello! Welcome to Farmlink Plus. I can help you find products, farmers, orders, delivery information, and account guidance.",
        suggestions: [
          "Show fresh vegetables",
          "Find farmers in Kathmandu",
          "How do I place an order?",
          "How do I add a product?",
        ],
      });
    }

    // order help
    if (text.includes("order")) {
      return ok(res, {
        reply:
          "To place an order, open Marketplace, choose a product, add it to cart, then go to Checkout. You can track your order from the Orders page.",
        suggestions: [
          "Open marketplace",
          "How to track my order?",
          "How to cancel my order?",
        ],
      });
    }

    // add product help
    if (text.includes("add product") || text.includes("sell product") || text.includes("product upload")) {
      return ok(res, {
        reply:
          "If you are logged in as farmer, restaurant, or industrial seller, go to Dashboard > Add Product. You can add product details, price, stock, and image by URL or local upload.",
        suggestions: [
          "How to upload product image?",
          "Who can add products?",
          "Manage my products",
        ],
      });
    }

    // farmer search
    if (text.includes("farmer")) {
      const cityMatch = message.match(/in\s+([a-zA-Z\s]+)/i);
      let farmers = [];

      if (cityMatch && cityMatch[1]) {
        const city = cityMatch[1].trim();
        const [rows] = await pool.query(
          `SELECT id, full_name, city, business_name
           FROM users
           WHERE role='farmer' AND status='active' AND city LIKE ?
           ORDER BY created_at DESC
           LIMIT 5`,
          [`%${city}%`]
        );
        farmers = rows;
      } else {
        const [rows] = await pool.query(
          `SELECT id, full_name, city, business_name
           FROM users
           WHERE role='farmer' AND status='active'
           ORDER BY created_at DESC
           LIMIT 5`
        );
        farmers = rows;
      }

      if (!farmers.length) {
        return ok(res, {
          reply: "I could not find matching farmers right now.",
          suggestions: ["Find farmers in Kathmandu", "Show all farmers"],
        });
      }

      const list = farmers
        .map((f) => `• ${f.full_name}${f.city ? ` - ${f.city}` : ""}${f.business_name ? ` (${f.business_name})` : ""}`)
        .join("\n");

      return ok(res, {
        reply: `Here are some farmers I found:\n${list}`,
        suggestions: ["Show all farmers", "Find farmers in Bara", "Open farmers page"],
      });
    }

    // product search
    if (
      text.includes("vegetable") ||
      text.includes("fruit") ||
      text.includes("rice") ||
      text.includes("product") ||
      text.includes("show")
    ) {
      let keyword = message.trim();

      const [products] = await pool.query(
        `SELECT name, category, price, unit, city
         FROM products
         WHERE is_active = 1
           AND (
             name LIKE ?
             OR category LIKE ?
             OR description LIKE ?
           )
         ORDER BY created_at DESC
         LIMIT 5`,
        [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
      );

      if (!products.length) {
        const [latest] = await pool.query(
          `SELECT name, category, price, unit, city
           FROM products
           WHERE is_active = 1
           ORDER BY created_at DESC
           LIMIT 5`
        );

        if (!latest.length) {
          return ok(res, {
            reply: "No products are available right now.",
            suggestions: ["Show marketplace", "Find farmers", "How to add product?"],
          });
        }

        const fallbackList = latest
          .map((p) => `• ${p.name} - Rs ${p.price}/${p.unit}${p.city ? ` - ${p.city}` : ""}`)
          .join("\n");

        return ok(res, {
          reply: `I could not find an exact match. Here are some latest products:\n${fallbackList}`,
          suggestions: ["Show vegetables", "Show fruits", "Open marketplace"],
        });
      }

      const list = products
        .map((p) => `• ${p.name} (${p.category}) - Rs ${p.price}/${p.unit}${p.city ? ` - ${p.city}` : ""}`)
        .join("\n");

      return ok(res, {
        reply: `Here are some matching products:\n${list}`,
        suggestions: ["Open marketplace", "Show vegetables", "Show fruits"],
      });
    }

    // delivery help
    if (text.includes("delivery") || text.includes("shipping")) {
      return ok(res, {
        reply:
          "Delivery depends on the seller and delivery area entered in the product details. Check the product page to see delivery option and delivery area before ordering.",
        suggestions: [
          "Show marketplace",
          "How to place an order?",
          "How to check delivery area?",
        ],
      });
    }

    // account help
    if (text.includes("login") || text.includes("register") || text.includes("account")) {
      return ok(res, {
        reply:
          "You can register as farmer, restaurant, industrial buyer, customer, or admin. After login, your dashboard options change based on your role.",
        suggestions: [
          "Who can add products?",
          "How do I update profile?",
          "How do I place an order?",
        ],
      });
    }

    return ok(res, {
      reply:
        "I can help with products, farmers, delivery, orders, and account guidance. Try asking something like 'Show vegetables', 'Find farmers in Kathmandu', or 'How do I place an order?'",
      suggestions: [
        "Show vegetables",
        "Find farmers in Kathmandu",
        "How do I place an order?",
        "How do I add a product?",
      ],
    });
  } catch (error) {
    return fail(res, error.message || "Chatbot failed", 500);
  }
}

module.exports = { askChatbot };