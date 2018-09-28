//
//  RNTesterViewController.m
//  playground-iOS
//
//  Created by 万致远 on 2018/9/25.
//  Copyright © 2018年 万致远. All rights reserved.
//

#import "RNTesterViewController.h"
#import <React/RCTRootView.h>

@interface RNTesterViewController ()

@end

@implementation RNTesterViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initRootView];
    // Do any additional setup after loading the view.
}

- (void)initRootView {
    
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL: jsCodeLocation
                                moduleName: @"RNHighScores"
                         initialProperties:
     @{
       @"scores" : @[
               @{
                   @"name" : @"Alex",
                   @"value": @"42"
                   },
               @{
                   @"name" : @"Joel",
                   @"value": @"10"
                   }
               ]
       }
                             launchOptions: nil];
    
    
    self.view = rootView;
    
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
