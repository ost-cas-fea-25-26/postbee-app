async function initMocks() {
  if (typeof window === 'undefined') {
    console.warn('INIT MSW SERVER');
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    console.warn('INIT MSW worker');
    void worker.start();
  }
}

await initMocks();

export {};
