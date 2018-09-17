//
//  ViewController.m
//  playground-iOS
//
//  Created by 万致远 on 2018/8/24.
//  Copyright © 2018年 万致远. All rights reserved.
//

#import "ViewController.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  UITextView *textView = [[UITextView alloc] init];
  NSLog(@"%@", [textView font]);
  UITextField *textField = [[UITextField alloc] init];
  [textField setFont:nil];
  NSLog(@"%@", [textField font]);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
