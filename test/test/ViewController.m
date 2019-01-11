//
//  ViewController.m
//  test
//
//  Created by 万致远 on 2018/11/20.
//  Copyright © 2018 万致远. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIFont *font1 = [UIFont fontWithName:@".SFUIText" size:16];
    UIFont *font2 = [UIFont fontWithName:@".PingFangSC-Regular" size:16];
    UIFont *systemFont = [UIFont
                          preferredFontForTextStyle];
    NSLog(@"%@", systemFont);
    NSLog(@"%lf", font1.lineHeight);
    NSLog(@"%lf", font2.lineHeight);
    // Do any additional setup after loading the view, typically from a nib.
}


@end
