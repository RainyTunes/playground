//
//  WeexTesterViewController.m
//  playground-iOS
//
//  Created by 万致远 on 2018/9/25.
//  Copyright © 2018年 万致远. All rights reserved.
//

#import "WeexTesterViewController.h"
#import <WeexSDK/WXSDKInstance.h>

@interface WeexTesterViewController ()
@property (nonatomic, strong) WXSDKInstance *instance;
@property (nonatomic, strong) UIView *weexView;

@end

@implementation WeexTesterViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = self.view.frame;
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
    };
    
    _instance.onFailed = ^(NSError *error) {
        //process failure
    };
    
    _instance.renderFinish = ^ (UIView *view) {
        //process renderFinish
    };
//    NSURL *url = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"js"];
    self.url = [NSURL URLWithString:@"http://10.69.109.86:8081"];
    [_instance renderWithURL:self.url options:@{@"bundleUrl":[self.url absoluteString]} data:nil];
}



- (void)dealloc {
    [_instance destroyInstance];
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
