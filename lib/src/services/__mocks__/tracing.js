export default {
  created(broker) {
    broker.createTracing = jest.fn().mockImplementation(() => ({
      start: jest.fn(),
      end: jest.fn(),
    }))
  },
}
