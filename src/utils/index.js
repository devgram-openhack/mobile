class Utils {
  /**
   * Checks if a ScrollView is close to bottom.
   * https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
   *
   * @param {object} nativeEvent From ScrollView event.
   * @param {number} paddingToBottom Padding to bottom.
   *
   * @returns {boolean} A boolean value.
   */
  isCloseToBottom({ contentOffset, contentSize, layoutMeasurement }, paddingToBottom) {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }

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