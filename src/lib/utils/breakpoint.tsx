'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

import useBreakpoint from 'use-breakpoint';

const BREAKPOINTS = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
type BreakpointKey = keyof typeof BREAKPOINTS;

const BreakpointCtx = createContext<BreakpointKey>('md');

export function BreakpointProvider({ children }: PropsWithChildren) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'md');

  return <BreakpointCtx.Provider value={breakpoint}>{children}</BreakpointCtx.Provider>;
}

export function useMumbleBreakpoint() {
  return useContext(BreakpointCtx);
}
