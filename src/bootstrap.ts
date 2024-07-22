async function prepare() {
  const mocksEnabled = process.env['MOCKS_ENABLED'];

  if (mocksEnabled && mocksEnabled === 'all') {
    const previewMocks = await import('./service/mocks/handlers/preview');
    const authMocks = await import('./service/mocks/handlers/auth');
    const dashboardMocks = await import('./service/mocks/handlers/dashboard');
    const { setupWorker } = await import('msw');
    const mockBrowserService = setupWorker(
      ...previewMocks.handlers,
      ...authMocks.handlers,
      ...dashboardMocks.handlers,
    );
    mockBrowserService.start();
  }

  return Promise.resolve();
}

export default prepare;
