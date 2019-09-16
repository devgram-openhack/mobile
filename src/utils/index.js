class Utils {
  /**
   * Creates a promise timeout.
   *
   * @param {number} seconds The number of seconds to wait before resolving.
   *
   * @returns {Promise<undefined>} A promise that resolves after a number of seconds.
   */
  timeout(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
}

const utils = new Utils();

export { utils };