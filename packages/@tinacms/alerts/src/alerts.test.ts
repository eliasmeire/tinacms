import { Alerts } from './alerts'

jest.useFakeTimers()

describe('Alerts', () => {
  it('is empty by default', () => {
    const alerts = new Alerts()

    expect(alerts.all).toHaveLength(0)
  })
  describe('calling alerts.add("info", "Test")', () => {
    it('creates alert with message: "Test"', () => {
      const alerts = new Alerts()

      alerts.info('Test')

      const testAlert = alerts.all.pop()
      expect(testAlert?.message).toBe('Test')
    })
    it('creates alert with level: "info"', () => {
      const alerts = new Alerts()

      alerts.info('Test')

      const testAlert = alerts.all.pop()
      expect(testAlert?.level).toBe('info')
    })
    it('will remove the message after 3000ms', async () => {
      const alerts = new Alerts()
      alerts.info('Test')

      jest.runOnlyPendingTimers()

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000)
      expect(alerts.all).toHaveLength(0)
    })
  })
  describe('calling alerts.add("info", "Test", 1351)', () => {
    it('the message is removed after 1.351 seconds', async () => {
      const alerts = new Alerts()

      alerts.info('Test', 1351)

      jest.runOnlyPendingTimers()
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1351)
      expect(alerts.all).toHaveLength(0)
    })
    describe('when the dismiss callback is called before the time is up', () => {
      it('is fine and dandy', () => {
        const alerts = new Alerts()
        const dismiss = alerts.info('Test')

        dismiss()

        jest.runOnlyPendingTimers()
        expect(alerts.all).toHaveLength(0)
      })
    })
  })

  describe('#subscribe(listener)', () => {
    it('does not call listener', () => {
      const listener = jest.fn()
      const alerts = new Alerts()

      alerts.subscribe(listener)

      expect(listener).not.toHaveBeenCalled()
    })
    it('listener is called after `info` is called', () => {
      const listener = jest.fn()
      const alerts = new Alerts()
      alerts.subscribe(listener)

      alerts.info('Test')

      expect(listener).toHaveBeenCalled()
    })
    it('listener is called after `dismiss` is called', () => {
      const listener = jest.fn()
      const alerts = new Alerts()
      const dismiss = alerts.info('Test')
      alerts.subscribe(listener)

      dismiss()

      expect(listener).toHaveBeenCalled()
    })
  })
  describe('alerts.info("Information", 2000)', () => {
    it('calls alerts.add("info", "Information", 2000)', () => {
      const alerts = new Alerts()
      alerts.add = jest.fn()

      alerts.info('Information', 2000)

      expect(alerts.add).toHaveBeenCalledWith('info', 'Information', 2000)
    })
  })
  describe('alerts.success("Hooray!", 6000)', () => {
    it('calls alerts.add("success", "Hooray!", 6000)', () => {
      const alerts = new Alerts()
      alerts.add = jest.fn()

      alerts.success('Hooray!', 6000)

      expect(alerts.add).toHaveBeenCalledWith('success', 'Hooray!', 6000)
    })
  })
  describe('alerts.warn("Warning", 40)', () => {
    it('calls alerts.add("warn", "Warning", 40)', () => {
      const alerts = new Alerts()
      alerts.add = jest.fn()

      alerts.warn('Warning', 40)

      expect(alerts.add).toHaveBeenCalledWith('warn', 'Warning', 40)
    })
  })
  describe('alerts.error("Error", 560)', () => {
    it('calls alerts.add("error", "Error", 560)', () => {
      const alerts = new Alerts()
      alerts.add = jest.fn()

      alerts.error('Error', 560)

      expect(alerts.add).toHaveBeenCalledWith('error', 'Error', 560)
    })
  })
})
