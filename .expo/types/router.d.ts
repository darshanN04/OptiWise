/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/` | `/(auth)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/Registration` | `/(tabs)/prescription` | `/(tabs)/profile` | `/Registration` | `/_sitemap` | `/login` | `/prescription` | `/profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
