// AAHOC AI Module: Orchestrates Trigger -> Agent -> Context -> Reasoning -> Tools+Knowledge -> Recommendation -> Approval -> Action -> Logging
export * from './agent/index.js';
export * from './context/index.js';
export * from './reasoning/index.js';
export * from './tools/index.js';
export * from './knowledge/index.js';
export * from './recommendations/index.js';
export * from './approvals/index.js';
export * from './actions/index.js';

export const aiModule = {
  name: 'ai-orchestrator',
  initialized: true,
};