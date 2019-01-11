//
//  TestViewController.m
//  playground-iOS
//
//  Created by 万致远 on 2018/12/6.
//  Copyright © 2018 万致远. All rights reserved.
//

#import "TestViewController.h"
#define IMAGE_COUNT 10

@interface TestViewController (){
    CALayer *_layer;
    int _index;
    NSMutableArray *_images;
}

@end

@implementation TestViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    UIButton *button = [[UIButton alloc] init];
    UIImage *buttonImage = [[UIImage alloc] init];
    button.frame = CGRectMake(100, 100, 100, 100);
    button.backgroundColor = UIColor.redColor;
    [button setImage:buttonImage forState:UIControlStateNormal];
    [button setTitle:@"帧动画" forState:UIControlStateNormal];
    [button addTarget:self action:@selector(start) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
    
    UIButton *button2 = [[UIButton alloc] init];
    UIImage *buttonImage2 = [[UIImage alloc] init];
    button2.frame = CGRectMake(300, 100, 100, 100);
    button2.backgroundColor = UIColor.redColor;
    [button2 setImage:buttonImage2 forState:UIControlStateNormal];
    [button2 setTitle:@"粒子动画" forState:UIControlStateNormal];
    [button2 addTarget:self action:@selector(start2) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button2];
    
}

- (void)start {
    //设置背景
    self.view.layer.contents=(id)[UIImage imageNamed:@"bg.png"].CGImage;
    
    //创建图像显示图层
    _layer=[[CALayer alloc]init];
    _layer.bounds=CGRectMake(0, 0, 87, 32);
    _layer.position=CGPointMake(160, 284);
    [self.view.layer addSublayer:_layer];
    
    //由于鱼的图片在循环中会不断创建，而10张鱼的照片相对都很小
    //与其在循环中不断创建UIImage不如直接将10张图片缓存起来
    _images=[NSMutableArray array];
    for (int i=0; i<9; ++i) {
        NSString *imageName=[NSString stringWithFormat:@"20190111145529-000%i.jpg",i+1];
        UIImage *image=[UIImage imageNamed:imageName];
        [_images addObject:image];
    }
    
    //定义时钟对象
    CADisplayLink *displayLink=[CADisplayLink displayLinkWithTarget:self selector:@selector(step)];
    //添加时钟对象到主运行循环
    [displayLink addToRunLoop:[NSRunLoop mainRunLoop] forMode:NSDefaultRunLoopMode];
}

#pragma mark 每次屏幕刷新就会执行一次此方法(每秒接近60次)
-(void)step{
    //定义一个变量记录执行次数
    static int s=0;
    //每秒执行6次
    if (++s%10==0) {
        UIImage *image=_images[_index];
        _layer.contents=(id)image.CGImage;//更新图片
        _index=(_index+1)%IMAGE_COUNT;
    }
}

- (void)start2 {
    
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
