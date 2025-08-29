export interface Theme {
  name: string;
  colors: { [key: string]: string };
}

const commonColors = {
  '--color-text-on-primary': '#ffffff',
  '--color-text-header': '#1e293b',
  '--color-text-primary': '#334155',
  '--color-text-secondary': '#475569',
  '--color-background': '#f8fafc',
  '--color-background-card': '#ffffff',
  '--color-background-hover': '#e2e8f0',
  '--color-background-disabled': '#f1f5f9',
  '--color-text-disabled': '#94a3b8',
};

export const THEMES: Theme[] = [
  {
    name: 'Indigo',
    colors: {
      ...commonColors,
      '--color-primary': '#4f46e5',
      '--color-primary-dark': '#4338ca',
      '--color-primary-accent-bg': '#e0e7ff',
      '--color-primary-accent-border': '#c7d2fe',
      '--color-secondary-for-selector': '#94a3b8', // slate-400
    },
  },
  {
    name: 'Teal & Amber',
    colors: {
      ...commonColors,
      '--color-primary': '#0d9488',
      '--color-primary-dark': '#0f766e',
      '--color-primary-accent-bg': '#ccfbf1',
      '--color-primary-accent-border': '#99f6e4',
      '--color-secondary-for-selector': '#f59e0b', // amber-500
    },
  },
  {
    name: 'Deep Purple & Pink',
    colors: {
      ...commonColors,
      '--color-primary': '#7c3aed',
      '--color-primary-dark': '#6d28d9',
      '--color-primary-accent-bg': '#ede9fe',
      '--color-primary-accent-border': '#ddd6fe',
      '--color-secondary-for-selector': '#f472b6', // pink-400
    },
  },
  {
    name: 'Green & Orange',
    colors: {
      ...commonColors,
      '--color-primary': '#16a34a',
      '--color-primary-dark': '#15803d',
      '--color-primary-accent-bg': '#dcfce7',
      '--color-primary-accent-border': '#bbf7d0',
      '--color-secondary-for-selector': '#f97316', // orange-500
    },
  },
    {
    name: 'Blue Grey & Red',
    colors: {
      ...commonColors,
      '--color-primary': '#475569',
      '--color-primary-dark': '#334155',
      '--color-primary-accent-bg': '#e2e8f0',
      '--color-primary-accent-border': '#cbd5e1',
      '--color-secondary-for-selector': '#ef4444', // red-500
    },
  },
];
