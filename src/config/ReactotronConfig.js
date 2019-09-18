import Reactotron from 'reactotron-react-native';
/**
 * __DEV__ it's a main variable on reactive native that
 * come as true when it's runing in dev mode
 */
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  // eslint-disable-next-line no-console
  console.tron = tron;
  /**
   *it create a new property into console,
   *turning easily to call it in any file
   */

  tron.clear();
  /**
   * this function clear the logs when reaload the mobile
   */
}
