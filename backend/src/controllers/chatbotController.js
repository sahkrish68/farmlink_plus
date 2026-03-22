const { GoogleGenAI } = require("@google/genai");
const pool = require("../config/db");
const { ok, fail } = require("../utils/response");

const ai = new GoogleGenAI({});

function formatProducts(products) {
  if (!products.length) return "No matching products found.";
  return products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} | category: ${p.category || "N/A"} | price: Rs ${p.price}/${p.unit} | city: ${p.city || "N/A"}`
    )
    .join("\n");
}

function formatFarmers(farmers) {
  if (!farmers.length) return "No matching farmers found.";
  return farmers
    .map(
      (f, i) =>
        `${i + 1}. ${f.full_name} | city: ${f.city || "N/A"} | business: ${f.business_name || "N/A"}`
    )
    .join("\n");
}

async function askChatbot(req, res) {
  try {
    const message = String(req.body.message || "").trim();

    if (!message) {
      return fail(res, "Message is required", 400);
    }

    if (!process.env.GEMINI_API_KEY) {
      return fail(res, "GEMINI_API_KEY is missing in backend .env", 500);
    }

    const like = `%${message}%`;

    const [products] = await pool.query(
      `SELECT name, category, price, unit, city
       FROM products
       WHERE is_active = 1
         AND (name LIKE ? OR category LIKE ? OR description LIKE ?)
       ORDER BY created_at DESC
       LIMIT 8`,
      [like, like, like]
    );

    const [farmers] = await pool.query(
      `SELECT full_name, city, business_name
       FROM users
       WHERE role = 'farmer'
         AND status = 'active'
         AND (full_name LIKE ? OR city LIKE ? OR business_name LIKE ?)
       ORDER BY created_at DESC
       LIMIT 8`,
      [like, like, like]
    );

    const prompt = `
You are Farmlink Plus AI Assistant.

Your job:
- Help users of Farmlink Plus.
- Answer questions about products, farmers, orders, selling, delivery, and account usage.
- Use the provided marketplace data when relevant.
- Be practical and short.
- If exact data is not found, say so clearly.
- Do not invent products, farmers, or prices.
- If the user asks general Farmlink usage questions, explain step by step.
- If the user asks about ordering, explain: marketplace -> product -> cart -> checkout -> orders.
- If the user asks about selling, explain: dashboard -> add product -> manage products.
- Keep answers friendly and simple.

Relevant products:
${formatProducts(products)}

Relevant farmers:
${formatFarmers(farmers)}

User question:
${message}
`.trim();

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
      contents: prompt,
    });

    const reply = response.text || "Sorry, I could not generate a response right now.";

    return ok(res, {
      reply,
      suggestions: [
        "Show vegetables",
        "Find farmers in Kathmandu",
        "How do I place an order?",
        "How do I add a product?",
      ],
    });
  } catch (error) {
    console.error("chatbot error:", error);
    return fail(res, error.message || "Chatbot failed", 500);
  }
}

module.exports = { askChatbot };