import type { BrowserContext } from 'playwright';
import { RenderOptions } from './render';
import type { SafePage } from './safepage';

declare module 'playwright' {
  interface BrowserContext {
    pages(): SafePage[];
  }
}

export interface State {
  tests: Record<string, () => void>;
  currentSuitePlusTest: string;
  retryMap: Record<string, number>;
  __filename?: string;
  activeTest?: string;
  options: RenderOptions;
  isGlobalSetupTeardownRegistered: boolean;
  debugging: Set<string>;
  passedTests: Set<string>;
  exposeGlobals: Record<string, any>;
  bridge?: Function;
  pause?: Function;
  pauseAtEveryStep?: boolean;
  vitestGlobals?: any;
  /**
   * Tests run way faster if we keep the window alive. Note: Only do this when not
   * in video mode else the video memory wreaks havoc.
   */
  browserContextInstance?: BrowserContext & {
    headless?: boolean;
  };
  nextIndex: number;
  debugPort?: number;
  redirectUrl?: string;
  /** What to do when everything is really done, like shutdown docker container */
  afterAllsDone: Array<() => Promise<void>>;
  isCi: boolean;
  /**
   * When a test is being run we need to track which element to render, this is only useful for
   * the browser side of things
   */
  browserState?: {
    retryAttempt: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderContainer: { __type: 'renderContainer'; value: any };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderElement: { __type: 'renderElement'; value: any };
    renderFn?: (...args: any[]) => any;
  };
}

export const state: State = {
  tests: {},
  retryMap: {},
  options: {},
  currentSuitePlusTest: '',
  isGlobalSetupTeardownRegistered: false,
  exposeGlobals: {},
  debugging: new Set(),
  passedTests: new Set(),
  nextIndex: 0,
  afterAllsDone: [],
  isCi: false,
};