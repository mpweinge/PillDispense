//
//  TTWServerBridge.m
//  PillDispense
//
//  Created by Michael Weingert on 2013-12-24.
//  Copyright (c) 2013 Michael Weingert. All rights reserved.
//

#import "TTWServerBridge.h"

@implementation TTWServerBridge

static const NSString* const baseURL = @"http://99.249.4.129/PillDispense/";

-(NSString* )GetAllInventory
{
    return [self getDataFrom:[baseURL stringByAppendingString:@"PillInventoryBridge.php?"] withRequestString:@"GetAllInventory=true" ];
}

-(NSString* ) GetInventory:(NSString*) name
{
    NSString* queryBase = @"GetInventory=true&name=";
    queryBase = [queryBase stringByAppendingString:name];
    return [self getDataFrom:[baseURL stringByAppendingString:@"PillInventoryBridge.php?"] withRequestString:queryBase ];
}

-(NSString* ) RegisterPill:(NSString*) name withNumLeft: (NSString*) numLeft
{
    NSString* queryBase = @"RegisterPill=true&name=";
    queryBase = [queryBase stringByAppendingString:name];
    NSString* numLeftQ = @"&numLeft=";
    numLeftQ = [numLeftQ stringByAppendingString:numLeft];
    
    queryBase = [queryBase stringByAppendingString:numLeftQ];
    
    return [self getDataFrom:[baseURL stringByAppendingString:@"PillInventoryBridge.php?"] withRequestString:queryBase ];
}

-(NSString* ) UpdateInventory:(NSString*) name withNumLeft: (NSString*) numLeft
{
    NSString* queryBase = @"UpdateInventory=true&name=";
    queryBase = [queryBase stringByAppendingString:name];
    NSString* numLeftQ = @"&numLeft=";
    numLeftQ = [numLeftQ stringByAppendingString:numLeft];
    
    queryBase = [queryBase stringByAppendingString:numLeftQ];
    
    return [self getDataFrom:[baseURL stringByAppendingString:@"PillInventoryBridge.php?"] withRequestString:queryBase ];
}


- (NSString *) getDataFrom:(NSString *)url withRequestString:(NSString *)requestString
{
    // Create your request string with parameter name as defined in PHP file
    //NSString *requestString = [NSString stringWithFormat:@"GetAllInventory=true"];
    
    // Create Data from request
    //NSData *requestData = [NSData dataWithBytes: [requestString UTF8String] length: [requestString length]];
    //NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL: [NSURL URLWithString: @"http://99.249.4.129/PillDispense/PillInventoryBridge.php"]];
    
    //For get, append to URL
    url = [url stringByAppendingString:requestString];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL: [NSURL URLWithString:url]];
    // set Request Type
    [request setHTTPMethod: @"GET"];
    // Set content-type
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"content-type"];
    // Set Request Body
    //[request setHTTPBody: requestData];
    // Now send a request and get Response
    NSError * error = nil;
    NSURLResponse * urlResponse = nil;
    NSData *returnData = [NSURLConnection sendSynchronousRequest: request returningResponse: &urlResponse error: &error];
    // Log Response
    NSString *response = [[NSString alloc] initWithBytes:[returnData bytes] length:[returnData length] encoding:NSUTF8StringEncoding];
    NSLog(@"%@",response);
    
    return response;
}

@end



