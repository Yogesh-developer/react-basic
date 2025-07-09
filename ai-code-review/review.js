// ai-code-review/review.js
const path = require("node:path");
const { config } = require("dotenv");
const fetch = require("node-fetch");

// Load environment variables from the root `.env`
const rootEnvPath = path.resolve(__dirname, "../.env");
const result = config({ path: rootEnvPath });

if (result.error) {
  console.error("❌ Failed to load .env from root:", result.error);
  process.exit(1);
}

const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME, PR_NUMBER, GITHUB_API_URL } =
  process.env;

// Fetch PR diff
async function getDiff() {
  const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.diff",
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch diff: ${res.status} – ${await res.text()}`
    );
  }
  return res.text();
}

// Generate AI review via Ollama
async function getAIReview(diff) {
  const prompt = `
You are a senior React engineer. Provide inline suggestions with GitHub-style suggestion blocks.
Paste the diff after this instruction:

\`\`\`diff
${diff}
\`\`\`
`;

  const res = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "codellama",
      prompt,
      stream: false,
    }),
  });
  if (!res.ok) {
    throw new Error(`Ollama error: ${res.status} – ${await res.text()}`);
  }
  const data = await res.json();
  console.log("📝 AI response snippet:\n", data.response.slice(0, 200), "...");
  return data.response || "No response";
}

// Post comment to GitHub PR
async function postCommentToPR(body) {
  const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues/${PR_NUMBER}/comments`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });
  if (!res.ok) {
    throw new Error(
      `Failed to post comment: ${res.status} – ${await res.text()}`
    );
  }
  console.log("✅ Comment posted to PR");
}

async function runReviewFlow() {
  console.log("📥 Fetching Git diff...");
  const diff = await getDiff();
  if (!diff.trim()) {
    console.warn("⚠️ No diff found.");
    return;
  }

  console.log("🧠 Sending diff to Ollama...");
  const review = await getAIReview(diff);

  console.log("💬 Posting review comment...");
  await postCommentToPR(review);
}

runReviewFlow().catch((err) => {
  console.error("💥 Review flow failed:", err);
  process.exit(1);
});
