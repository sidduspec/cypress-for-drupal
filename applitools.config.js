module.exports = {
  apiKey: process.env.APPLITOOLS_API_KEY,
  showLogs: true,
  failCypressAfterAllSpecs: false,
  failCypressOnDiff: true,
  failNewTests: true,
  useUltrafastGrid: true,
  testConcurrency: 5,

  // UFG browsers (used for ongoing env baselines and env↔env)
  browsers: [
    { width: 1920, height: 1080, name: 'chrome' },
    { deviceName: 'iPhone X' },
    { deviceName: 'iPad Mini' }
  ],

  // Define your apps here
  apps: {
    damsafety: {
      appName: 'damsafety',
      batchName: 'damsafety - Visual Regression',

      liveUrl: process.env.LIVE_URL || 'https://damsafety.org',
      devUrl:  process.env.DEV_URL  || 'https://dev-damsafety.specbee.site/',
      uatUrl:  process.env.UAT_URL  || '',

      liveBranch: 'live',
      devBranch:  'dev',
      uatBranch:  'uat',

      // Where Figma baselines live (read-only)
      figmaBranch: 'default'
    },

    // Add betacare / cart_e / inx entries similarly…
  },

  getAppConfig(appKey, pair, target = 'compare') {
    const app = this.apps[appKey];
    if (!app) throw new Error(`App config not found for key: ${appKey}`);

    const PAIRS = {
      // 1) Figma → UAT (seed run). Visit UAT, compare against Figma parent
      figma_seed_uat: {
        label: 'FIGMA→UAT (SEED)',
        type: 'figma_seed',
        figmaBranch: app.figmaBranch,
        envBranch:   app.uatBranch,
        targetUrl:   app.uatUrl
      },
      // (Optional) Figma → DEV (seed)
      figma_seed_dev: {
        label: 'FIGMA→DEV (SEED)',
        type: 'figma_seed',
        figmaBranch: app.figmaBranch,
        envBranch:   app.devBranch,
        targetUrl:   app.devUrl
      },

      // 2) Post-seed: keep UAT as its own baseline with UFG
      uat_baseline: {
        label: 'UAT BASELINE',
        type: 'self_baseline',
        baseUrl: app.uatUrl,
        branch:  app.uatBranch
      },

      // 3) Env ↔ Env comparisons (optional, keep as you already use)
      live_vs_uat: {
        label: 'LIVE→UAT',
        type: 'env',
        baselineBranch: app.liveBranch,
        compareBranch:  app.uatBranch,
        baselineUrl:    app.liveUrl,
        compareUrl:     app.uatUrl
      },
      live_vs_dev: {
        label: 'LIVE→DEV',
        type: 'env',
        baselineBranch: app.liveBranch,
        compareBranch:  app.devBranch,
        baselineUrl:    app.liveUrl,
        compareUrl:     app.devUrl
      },
      uat_vs_dev: {
        label: 'UAT→DEV',
        type: 'env',
        baselineBranch: app.uatBranch,
        compareBranch:  app.devBranch,
        baselineUrl:    app.uatUrl,
        compareUrl:     app.devUrl
      }
    };

    const cfg = PAIRS[pair];
    if (!cfg) throw new Error(`Unknown pair: ${pair}`);

    if (cfg.type === 'figma_seed') {
      return {
        type: 'figma_seed',
        appName: app.appName,
        batchName: `${app.batchName} - ${cfg.label}`,
        baseUrl: cfg.targetUrl,        // visit env
        branchName: cfg.envBranch,     // child branch
        parentBranchName: cfg.figmaBranch // compare against Figma baselines
      };
    }

    if (cfg.type === 'self_baseline') {
      return {
        type: 'self_baseline',
        appName: app.appName,
        batchName: `${app.batchName} - ${cfg.label}`,
        baseUrl: cfg.baseUrl,
        branchName: cfg.branch        // no parent → env becomes its own baseline
      };
    }

    // env ↔ env
    const isBaseline = target === 'baseline';
    const baseUrl = isBaseline ? cfg.baselineUrl : cfg.compareUrl;

    return {
      type: 'env',
      appName: app.appName,
      batchName: `${app.batchName} - ${cfg.label}`,
      baseUrl,
      branchName: isBaseline ? cfg.baselineBranch : cfg.compareBranch,
      parentBranchName: isBaseline ? undefined : cfg.baselineBranch
    };
  }
};