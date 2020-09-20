export default class Graceful {
  public shutdown = (): void => {
    process.on('SIGINT', this.exitHandler.bind(null));
    process.on('SIGTERM', this.exitHandler.bind(null));
  }

  private exitHandler = (): void => {
    setTimeout(() => {
      process.exit();
    }, 3000);
  }
}
