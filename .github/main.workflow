workflow "New workflow" {
  on = "push"
  resolves = ["Deploy to Now"]
}

action "Filters master" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "Deploy to Now" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  secrets = ["ZEIT_TOKEN"]
  args = "--target production"
  needs = ["Filters master"]
}
