workflow "ESLint" {
  resolves = ["gimenete/eslint-action"]
  on = "pull_request"
}

action "gimenete/eslint-action" {
  uses = "gimenete/eslint-action@1bbfd5ba0d9e42a04050fa38f6b4eeeacabd9574"
  secrets = ["GITHUB_TOKEN"]
}
