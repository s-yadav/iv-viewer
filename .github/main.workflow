workflow "ESLint" {
  resolves = ["gimenete/eslint-action"]
  on = "pull_request"
}

action "gimenete/eslint-action" {
  uses = "wearebond/eslint-action@0c685eb"
  secrets = ["GITHUB_TOKEN"]
}
