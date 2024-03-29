#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <KakaoOpenSDK/KakaoOpenSDK.h>

@implementation AppDelegate

// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//                                       sourceApplication:(NSString *)sourceApplication
//                                               annotation:(id)annotation {
//     if ([KOSession isKakaoAccountLoginCallback:url]) {
//         return [KOSession handleOpenURL:url];
//     }

//     return false;
// }

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
                                                options:(NSDictionary<NSString *,id> *)options {
    if ([KOSession isKakaoAccountLoginCallback:url]) {
        return [KOSession handleOpenURL:url];
    }

    return false;
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    [KOSession handleDidBecomeActive];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Knock Knock";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [FIRApp configure];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    if ([FIRApp defaultApp] == nil) { 
      [FIRApp configure];
  }

#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
