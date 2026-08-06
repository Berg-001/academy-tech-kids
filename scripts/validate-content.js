const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const ignored = new Set(["node_modules", ".git"]);
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else files.push(target);
  }
}

walk(root);
const errors = [];
for (const file of files.filter((item) => item.endsWith(".md"))) {
  const content = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  if (!content.trim()) errors.push(`${relative}: arquivo vazio`);
  if (!content.startsWith("# ")) errors.push(`${relative}: título H1 ausente`);
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const link = match[1].split("#")[0];
    if (!link || /^(https?:|mailto:)/.test(link)) continue;
    const destination = path.resolve(path.dirname(file), decodeURI(link));
    if (!fs.existsSync(destination)) errors.push(`${relative}: link local inválido (${link})`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Conteúdo validado: ${files.length} arquivos, sem Markdown vazio ou links locais inválidos.`);
}
