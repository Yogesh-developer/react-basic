import { config } from "dotenv";
import fetch from "node-fetch";

config({ path: "../.env" });

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
      `❌ Failed to fetch PR diff: ${res.status} - ${await res.text()}`
    );
  }

  return await res.text();
}

// Generate review using Ollama (local model)
async function getAIReview(diff) {
  const prompt = `
After your prompt, paste the entire pull request diff.

---

### 🧠 Why this works?

- **Line-by-line context** triggers precise, actionable comments 💬  
- **suggestion blocks** create usable diffs in GitHub review UI  
- **File & line references** tell the AI exactly where to comment  
- **Rationale section** helps developers understand the "why" behind changes, not just the "what" :contentReference[oaicite:9]{index=9}

---

## ✅ Integration with Your Bot

In your review generation, embed the above prompt before sending to Ollama or Gemini. The response will contain structured review comments you can parse and post via:


- Or consolidated into a single comment with all inline suggestions

---

Would you like me to help parse this response and call GitHub’s inline comments endpoint automatically?
::contentReference[oaicite:10]{index=10}

Git Diff:
\`\`\`diff
${diff}
\`\`\`
`;

  const res = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "codellama", // or any model you've loaded in Ollama
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  console.log("dta", data);
  return data.response || "No response from model.";
}

// Post review comment to GitHub
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

  if (res.ok) {
    console.log("✅ Comment posted to PR");
  } else {
    const err = await res.text();
    console.error("❌ Failed to post comment:", err);
  }
}

// Main flow
async function runReviewFlow() {
  console.log("📥 Fetching GitHub PR diff...");
  const diff = await getDiff();

  if (!diff.trim()) {
    console.log("⚠️ No diff found.");
    return;
  }

  console.log("🧠 Sending diff to Ollama...");
  const review = await getAIReview(diff);

  console.log("💬 Posting review to GitHub...");
  await postCommentToPR(review);
}

runReviewFlow().catch(console.error);
