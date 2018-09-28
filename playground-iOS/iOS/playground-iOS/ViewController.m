//
//  ViewController.m
//  playground-iOS
//
//  Created by 万致远 on 2018/8/24.
//  Copyright © 2018年 万致远. All rights reserved.
//

#import "ViewController.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "Masonry.h"

@interface ViewController ()
@property (nonatomic, strong) JSContext* jsContext;
@property (nonatomic, strong) UITextView *jsTextView;
@property (nonatomic, strong) UITextView *outputTextView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initView];
    [self evaluateScript];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)clickRunJavaScript {
    NSString *script = self.jsTextView.text;
    [self.jsContext evaluateScript:script];
}

- (void)initView {
    self.jsTextView = [UITextView new];
    self.jsTextView.backgroundColor = UIColor.grayColor;
    [self.view addSubview:self.jsTextView];
    [self.jsTextView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.view.mas_left).with.offset(20);
        make.right.equalTo(self.view.mas_right).with.offset(-20);
        make.top.equalTo(self.view.mas_top).with.offset(100);
        make.height.equalTo(@100);
    }];
    
    UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
//    button.backgroundColor = UIColor.greenColor;
    [button setTitle:@"Run JavaScript" forState:UIControlStateNormal];
//    [button setTitleColor:UIColor.blackColor forState:UIControlStateNormal];
    [self.view addSubview:button];
    [button addTarget:self action:@selector(clickRunJavaScript) forControlEvents:UIControlEventTouchUpInside];
    [button mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self.view.mas_centerX);
        make.width.equalTo(@200);
        make.top.equalTo(self.jsTextView.mas_bottom).with.offset(20);
        make.height.equalTo(@50);
    }];
    
    self.outputTextView = [UITextView new];
    self.outputTextView.backgroundColor = UIColor.grayColor;
    [self.view addSubview:self.outputTextView];
    [self.outputTextView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.view.mas_left).with.offset(20);
        make.right.equalTo(self.view.mas_right).with.offset(-20);
        make.top.equalTo(button.mas_bottom).with.offset(20);
        make.height.equalTo(@100);
    }];
//    [self.view addSubview:button];
    
}

//直接执行js代码
- (void)evaluateScript {
    
}

- (JSContext *)jsContext {
    if (!_jsContext) {
        _jsContext = [[JSContext alloc] init];
        [_jsContext evaluateScript:@"var console = {log: function(message) { _consoleLog(message) }}"];
        
        _jsContext[@"_consoleLog"] = ^(NSString *message) {
            
        };
    }
    return _jsContext;
}



@end
