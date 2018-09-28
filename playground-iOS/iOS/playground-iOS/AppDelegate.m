//
//  AppDelegate.m
//  playground-iOS
//
//  Created by 万致远 on 2018/8/24.
//  Copyright © 2018年 万致远. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import "ViewController.h"
#import "RNTesterViewController.h"
#import "WeexTesterViewController.h"

#import <WeexSDK/WeexSDK.h>

@interface AppDelegate ()

@end

@implementation AppDelegate

- (void)initWeex {
    //business configuration
    [WXAppConfiguration setAppGroup:@"AliApp"];
    [WXAppConfiguration setAppName:@"WeexDemo"];
    [WXAppConfiguration setAppVersion:@"1.0.0"];
    
    //init sdk environment
    [WXSDKEngine initSDKEnvironment];
    
    //register custom module and component，optional
//    [WXSDKEngine registerComponent:@"MyView" withClass:[MyViewComponent class]];
//    [WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
    
    //register the implementation of protocol, optional
//    [WXSDKEngine registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
    
    //set the log level
    [WXLog setLogLevel: WXLogLevelAll];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
//    [self initWeex];
    
    // Override point for customization after application launch.
    
    MainViewController *mvc = [[MainViewController alloc] init];
    
    ViewController *viewController = [[ViewController alloc] init];
    viewController.title = @"Call Js";
    viewController.view.backgroundColor = UIColor.whiteColor;
    [mvc addChildViewController: viewController];
    
    RNTesterViewController *rnTesterViewController = [[RNTesterViewController alloc] init];
    rnTesterViewController.title = @"RNTester";
    rnTesterViewController.view.backgroundColor = UIColor.whiteColor;
    [mvc addChildViewController: rnTesterViewController];
    
    WeexTesterViewController *weexTesterViewController = [[WeexTesterViewController alloc] init];
    weexTesterViewController.title = @"WeexTester";
    weexTesterViewController.view.backgroundColor = UIColor.whiteColor;
    [mvc addChildViewController: weexTesterViewController];
    
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = mvc;
    [self.window makeKeyAndVisible];
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
