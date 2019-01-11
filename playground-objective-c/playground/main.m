//
//  main.m
//  playground
//
//  Created by 万致远 on 2018/8/24.
//  Copyright © 2018年 万致远. All rights reserved.
//

#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
//      NSMutableSet *set = [NSMutableSet set];
//      NSLog(@"%ld", set.allObjects.count);
//      [set addObject:@1];
//      [set addObject:@2];
//      [set addObject:@3];
//      NSLog(@"%@", set);
//      [set removeObject:@4];
//      NSLog(@"%@", set);
      
      
//      NSMutableDictionary *dic = [@{@"1":@"a", @"2":@"b"} mutableCopy];
//      NSMutableDictionary *dic = nil;
//      if (dic[@"foo"]) {
//        NSLog(@"bar");
//      }
      
//      NSMutableSet *set = [[NSMutableSet alloc] initWithArray:@[@1, @2, @3]];
//      [set addObject:@1];
//      NSLog(@"%@", set);
      
//      NSString *foo = @"123base64";
//      NSLog(@"%d", [foo containsString:@"base64"]);
      
//      NSString *foo = @"https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
//      NSLog(@"%d", [foo ])
      
//      NSString *foo = @"1234567";
//      NSLog(@"%@", [foo substringFromIndex:6]);
//      NSLog(@"%ld", NSMaxRange([foo rangeOfString:@"34567"]));
      
//      NSData *decodeData = [[NSData alloc] initWithBase64EncodedString:base64ImageDataString options:(NSDataBase64DecodingIgnoreUnknownCharacters)];
        
//        NSNumber *n1 = @1;
//        NSNumber *n2 = @2;
//        NSNumber *n3 = @3;
//        NSMutableArray *arr = [@[n1, n2, n3] mutableCopy];
//        arr[1] = nil;
//        for (NSNumber *num in arr) {
//            NSLog(@"%@", num);
//        }
        
        NSString *str = @"😂";
        NSData *data = [str dataUsingEncoding:NSUTF8StringEncoding];
        NSLog(@"%@", str);
        NSLog(@"%@", data);
        
        
      
    }
  
    return 0;
}
