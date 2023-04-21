<p align="center">
  <a href="https://github.com/turbocache-build/turbocache-action/actions"><img alt="turbocache-action status" src="https://github.com/turbocache-build/turbocache-action/workflows/test/badge.svg"></a>
</p>


**Note:** Requires a minimum version of `turbo@1.9.0`

# Turbocache Action :rocket:

## Setup

1. Add at the begging of your `workflow.yml`.

  ```yaml
  - uses: turbocache-build/turbocache-action@v1
    env:
      TURBO_API: 'https://cache.turbocache.build'
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: 'team_ci'
  ```

2. Update your build step to remove caching.

  ```yaml
  - name: Build
    run: npm build
    env:
      TURBO_API: 'https://cache.turbocache.build'
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: 'team_ci'
      TURBO_RUN_SUMMARY: true
  ```

