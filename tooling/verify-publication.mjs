import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function publicationIssues(path, text = '') {
  const problems = [];
  if (/(^|\/)(\.env(?:\..+)?|local\.properties)$/.test(path) && !path.endsWith('.env.example'))
    problems.push('private configuration');
  if (/\.(pfx|p12|pem|key|jks|keystore)$/.test(path))
    problems.push('private key or signing material');
  if (/^(docs\/planning\/source|artifacts-local|\.toolchains|node_modules|target)\//.test(path))
    problems.push('excluded local material');
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text))
    problems.push('private-key content');
  if (
    /\b(?:ghp|gho|ghu|ghs)_[A-Za-z0-9]{30,}\b|github_pat_[A-Za-z0-9_]{40,}|AKIA[A-Z0-9]{16}/.test(
      text,
    )
  )
    problems.push('credential-like content');
  if (/[A-Za-z]:[\\/]Users[\\/][^\s"']+/.test(text)) problems.push('personal absolute path');
  return problems;
}

export function verifyPublication() {
  const paths = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
  const issues = paths.flatMap((path) =>
    publicationIssues(path, readFileSync(path, 'utf8')).map((issue) => ({ path, issue })),
  );
  if (issues.length) {
    console.error(JSON.stringify(issues, null, 2));
    process.exitCode = 1;
  } else
    console.log(
      `Publication scan PASS: ${paths.length} tracked files; no excluded material or known credential patterns.`,
    );
  return issues;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  verifyPublication();
