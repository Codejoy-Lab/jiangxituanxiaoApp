declare module 'react-native-config' {
  export interface NativeConfig {
      [x: string]: any;
      HOSTNAME?: string;
  }
  
  export const Config: NativeConfig
  export default Config
}